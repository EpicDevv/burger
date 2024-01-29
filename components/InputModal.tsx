import { Fragment, useState, useEffect, useContext } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CartContext } from "../context/ShopContext";
import { useRouter } from "next/navigation";
import { convertNameToUrl, formatPrice } from "@/utils/helpers";
import Image from "next/image";
import { Product } from "@/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function InputModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { products, add } = useContext(CartContext);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<Product[]>([]);
  const router = useRouter();
  const filteredproducts =
    query === ""
      ? []
      : products.products.filter((item: Product) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    const savedRecent = localStorage.getItem("recent");
    if (savedRecent) {
      setRecent(JSON.parse(savedRecent));
    }
  }, []);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#008170] bg-opacity-40  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl ring-1 ring-inset ring-[#008170] transform divide-y dark:bg-[#232D3F] divide-[#008170] overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
              <Combobox
                onChange={(item: Product) => {
                  const newRecent: Product[] = [...recent!];
                  for (let recentItem of newRecent) {
                    if (recentItem.id === item.id) {
                      router.push(`/burger/${convertNameToUrl(item.name)}`);
                      setOpen(false);
                      return;
                    }
                  }
                  newRecent.push(item);
                  localStorage.setItem("recent", JSON.stringify(newRecent));
                  setRecent(newRecent);
                  router.push(`/burger/${convertNameToUrl(item.name)}`);
                  setOpen(false);
                }}
              >
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-[#008170]"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-[#008170] focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    {(query === "" || filteredproducts.length > 0) && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex transform-gpu divide-x divide-[#008170]"
                      >
                        <div
                          className={classNames(
                            "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                            activeOption! && "sm:h-96"
                          )}
                        >
                          {query === "" && (
                            <h2 className="mb-4 mt-2 flex items-center justify-between cursor-pointer hover:text-[#008170] text-xs font-semibold dark:text-white text-gray-500">
                              Recent searches
                              <span
                                onClick={() => {
                                  setRecent([]);
                                  localStorage.setItem(
                                    "recent",
                                    JSON.stringify([])
                                  );
                                  setOpen(false);
                                }}
                                className={classNames(
                                  "flex ml-2",
                                  recent.length === 0 ? "hidden" : ""
                                )}
                              >
                                <XMarkIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                clear
                              </span>
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-gray-900">
                            {(query === "" ? recent : filteredproducts).map(
                              (item: Product) => (
                                <Combobox.Option
                                  as="div"
                                  key={item.id}
                                  value={item}
                                  className={({ active }) =>
                                    classNames(
                                      "flex cursor-pointer select-none dark:text-white items-center rounded-md p-2",
                                      active
                                        ? "bg-[#008170] bg-opacity-55 dark:text-white text-gray-900"
                                        : ""
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <Image
                                        width={500}
                                        height={500}
                                        src={item.image}
                                        alt=""
                                        className="h-6 w-6 flex-none rounded-full"
                                      />
                                      <span className="ml-3 flex-auto truncate">
                                        {item.name}
                                      </span>
                                      {active && (
                                        <ChevronRightIcon
                                          className="ml-3 h-5 w-5 flex-none text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            )}
                          </div>
                        </div>

                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            <div className="flex-none p-6 text-center">
                              <Image
                                height={500}
                                width={500}
                                src={activeOption.image}
                                alt=""
                                className="mx-auto h-60 w-60 rounded-2xl object-cover object-center "
                              />
                              <h2 className="mt-3 font-semibold dark:text-white text-gray-900">
                                {activeOption.name}
                              </h2>
                              <p className="text-sm leading-6 text-gray-500">
                                {activeOption.description}
                              </p>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6">
                              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                <dt className="col-end-1 font-semibold dark:text-white text-gray-900">
                                  Calories
                                </dt>
                                <dd className="dark:text-white text-black">
                                  {activeOption.calorie}
                                </dd>
                                <dt className="col-end-1 font-semibold dark:text-white text-gray-900">
                                  Price
                                </dt>
                                <dd className="dark:text-white text-black">
                                  $ {formatPrice(activeOption.price)}
                                </dd>
                              </dl>
                              <button
                                onClick={() => {
                                  const cartItem = {
                                    ...activeOption,
                                    quantity: 1,
                                  };
                                  add(cartItem);
                                }}
                                type="button"
                                className="mt-6 w-full rounded-md bg-[#008170] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#005B41] "
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}

                    {query !== "" && filteredproducts.length === 0 && (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <FaceFrownIcon
                          className="mx-auto h-6 w-6 dark:text-white text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-[#008170]">
                          No items found
                        </p>
                        <p className="mt-2 dark:text-white text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
