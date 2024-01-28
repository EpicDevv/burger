"use client";

import { useContext } from "react";
import { CartContext } from "../context/ShopContext";

export function CartCount({ initialCartCount }: { initialCartCount: number }) {
  const { cart } = useContext(CartContext);
  let cartQuantity = 0;
  cart!.map((item: { quantity: number }) => {
    return (cartQuantity += item?.quantity);
  });
  // return <span>{cartQuantity === 0 ? "" : cartQuantity}</span>;
  // fix to use suspense
  return null;
}
