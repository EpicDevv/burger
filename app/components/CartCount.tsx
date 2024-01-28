"use client";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/ShopContext";

export function CartCount() {
  const [isClient, setIsClient] = useState(false);
  const { cart } = useContext(CartContext);
  let cartQuantity = 0;
  cart!.map((item: { quantity: number }) => {
    return (cartQuantity += item?.quantity);
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient || cartQuantity === 0) return null;
  return (
    <div className="absolute -right-1 -top-1 flex h-4 w-4 text-white items-center justify-center rounded-full bg-[#008170] text-sm font-bold">
      <span>{cartQuantity}</span>
    </div>
  );
}
