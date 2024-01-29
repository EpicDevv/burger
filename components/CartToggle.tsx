"use client";
import Link from "next/link";
import { CartContext } from "../context/ShopContext";
import { useContext } from "react";
const CartToggle = ({ children }: { children: React.ReactNode }) => {
  const { cartOpen, setCartOpen } = useContext(CartContext);
  return (
    <Link href="/cart">
      <div className="cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
        {children}
      </div>
    </Link>
  );
};

export default CartToggle;
