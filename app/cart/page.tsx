"use client";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/ShopContext";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { convertNameToUrl, formatPrice } from "../utils/helpers";
import Link from "next/link";
import Image from "next/image";
export default function Cart() {
  const [mounted, setMounted] = useState(false);
  const { cart, cartOpen, remove, setCartOpen, updateQuantity } =
    useContext(CartContext);

  let cartTotal = 0;

  cart!.map((item: any) => {
    cartTotal += formatPrice(item?.price) * item?.quantity;
  });
  cartTotal = Number(cartTotal.toFixed(2));

  useEffect(() => {
    setMounted(true);
  }, []);

  const submit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white dark:bg-[#0F0F0F]">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight dark:text-[#008170] text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        {mounted ? (
          <form
            onSubmit={submit}
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y dark:divide-[#005B41]/40 divide-gray-200 border-b border-t border-gray-200 dark:border-[#005B41]/40"
              >
                {cart!.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/burger/${convertNameToUrl(
                                  product.name
                                )}`}
                                className="font-medium dark:text-white/70 text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium dark:text-white/70 text-gray-900">
                            $ {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {product.quantity}
                          </label>
                          <select
                            onChange={(e) => {
                              updateQuantity(e.target.value, product);
                            }}
                            value={product.quantity}
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            className="max-w-full rounded-md border dark:bg-[#232D3F] border-[#005B41] py-1.5 text-left text-base font-medium leading-5 text-black dark:text-white shadow-sm focus:border-[#005B41] focus:outline-none focus:ring-1 focus:ring-[#005B41] sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>

                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => remove(product.id)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-[#008170] hover:text-[#005B41]"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 sticky top-0 rounded-lg dark:bg-[#232D3F] bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium dark:text-white text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm dark:text-white text-gray-600">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium dark:text-white text-gray-900">
                    ${cartTotal}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium dark:text-white text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium dark:text-white text-gray-900">
                    ${cartTotal}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className={`${
                    cartTotal === 0
                      ? "cursor-not-allowed bg-[#008170]"
                      : "cursor-pointer bg-[#008170] hover:bg-[#005B41]"
                  } w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none`}
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        ) : null}
      </div>
    </div>
  );
}
