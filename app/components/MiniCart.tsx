"use client";
import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import { convertNameToUrl } from "../utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/helpers";
import { CartContext } from "../context/ShopContext";

export default function MiniCart() {
  const cancelButtonRef = useRef<any>();

  const { cart, cartOpen, remove, setCartOpen } = useContext(CartContext);

  let cartTotal = 0;

  cart!.map((item: any) => {
    cartTotal += formatPrice(item?.price) * item?.quantity;
  });
  cartTotal = Number(cartTotal.toFixed(2))
  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-50 inset-0 overflow-hidden"
        onClose={() => {
          setCartOpen(!cartOpen);
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-[#008170] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white dark:bg-[#0F0F0F] shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-2xl font-bold text-[#008170] ">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className="-m-2 p-2 outline-none text-[#008170] hover:text-gray-500"
                          onClick={() => setCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {cart!.length > 0 ? (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart!.map((product: any) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-[#008170]">
                                      <h3>
                                        <Link
                                          onClick={() => setCartOpen(false)}
                                          href={`/burger/${convertNameToUrl(
                                            product.name
                                          )}`}
                                          passHref
                                        >
                                          {product.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4 text-black dark:text-white">
                                        $
                                        {formatPrice(product.price) *
                                          product.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-black dark:text-white">
                                      calories {product.calorie}
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <p className="text-black dark:text-white">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() => remove(product.id)}
                                        type="button"
                                        className="font-medium text-black dark:text-white hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <p className="text-[#008170] flex items-center">
                              Nothing in your cart!
                              <FaceFrownIcon
                                className="h-8 w-8 ml-5"
                                aria-hidden="true"
                              />
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {cart!.length > 0 ? (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-black dark:text-white">
                        <p>Subtotal</p>
                        <p>$ {cartTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-black dark:text-white">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#008170] hover:bg-[#005B41]"
                          onClick={() => {
                            setCartOpen(false);
                          }}
                          href="/cart"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium hover:text-[#008170]"
                            onClick={() => setCartOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
