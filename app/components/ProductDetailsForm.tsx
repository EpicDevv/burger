"use client";

import { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "../utils/helpers";

const sizes = [
  { name: "Small", description: "Not to share" },
  { name: "Medium", description: "Maybe share" },
  { name: "Large", description: "To share" },
];
export const ProductDetailsForm = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState<{
    name: string;
    description: string;
  } | null>(sizes[0]);
  const [withFries, setWithFries] = useState("no");

  useEffect(() => {
    if (withFries === "no") {
      setSelectedSize(null);
    }
  }, [withFries]);
  return (
    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
      <section aria-labelledby="options-heading">
        <h2 id="options-heading" className="sr-only">
          Product options
        </h2>
        <form>
          {/* With Fries */}
          <div className="mb-5">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white/80">
              Add fries?
            </h2>
            <RadioGroup
              value={withFries}
              onChange={setWithFries}
              className="mt-2"
            >
              <RadioGroup.Label className="sr-only">
                With Fries?
              </RadioGroup.Label>
              <div className="flex items-center space-x-3">
                <RadioGroup.Option
                  value="no"
                  className={({ active, checked }) =>
                    classNames(
                      "ring-[#008170]",
                      checked ? "ring-2" : "",
                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                    )
                  }
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      "h-8 w-8 rounded-full text-sm flex dark:border-[#008170] items-center justify-center text-black dark:text-white/80 border border-black border-opacity-40"
                    )}
                  >
                    No
                  </span>
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="Yes"
                  className={({ active, checked }) =>
                    classNames(
                      "ring-[#008170]",
                      checked ? "ring-2" : "",
                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                    )
                  }
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      "h-8 w-8 rounded-full text-sm flex items-center justify-center dark:text-white/80 text-black border border-black dark:border-[#008170] border-opacity-40"
                    )}
                  >
                    Yes
                  </span>
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>
          <div className="sm:flex sm:justify-between">
            {/* Size selector */}
            <RadioGroup value={selectedSize} onChange={setSelectedSize}>
              <RadioGroup.Label className="block text-sm font-medium dark:text-white/80 text-gray-700">
                Size
              </RadioGroup.Label>
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {sizes.map((size: any) => (
                  <RadioGroup.Option
                    as="div"
                    disabled={withFries === "no"}
                    key={size.name}
                    value={size}
                    className={({ active, disabled }) =>
                      classNames(
                        disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer",
                        active && !disabled ? "ring-2 ring-[#008170]" : "",
                        "relative block rounded-lg border border-gray-300 p-4 focus:outline-none"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label
                          as="p"
                          className="text-base font-medium dark:text-white/80 text-gray-900"
                        >
                          {size.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="p"
                          className="mt-1 text-sm dark:text-white/80 text-gray-500"
                        >
                          {size.description}
                        </RadioGroup.Description>
                        <div
                          className={classNames(
                            active ? "border" : "border-2",
                            checked ? "border-[#008170]" : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="mt-4">
            <Link
              href="#"
              className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
            >
              <span>What size should I buy?</span>
              <QuestionMarkCircleIcon
                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="flex Focus:ring-0 outline-none w-full items-center justify-center rounded-md border border-transparent bg-[#008170] px-8 py-3 text-base font-medium text-white hover:bg-[#008170] focus:outline-none focus:ring-[#008170]focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add to bag
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link href="#" className="group inline-flex text-base font-medium">
              <FaceSmileIcon
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-[#008170]"
                aria-hidden="true"
              />
              <span className="text-gray-500 hover:text-[#008170]">
                Fresh And Hot Guarantee
              </span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};
