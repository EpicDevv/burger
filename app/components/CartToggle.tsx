"use client";
import { CartContext } from "../context/ShopContext";
import { useContext } from "react";
const CartToggle = ({ children }: { children: React.ReactNode }) => {
  const { cartOpen, setCartOpen } = useContext(CartContext);
  return (
    <div className="cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
      {children}
    </div>
  );
};

export default CartToggle;
