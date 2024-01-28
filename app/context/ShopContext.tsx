"use client";

import { createContext, useState, useEffect } from "react";

interface Icart {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  quantity: number;
}

interface IcontextProps {
  remove: (item: string) => void;
  add: (newItem: Icart) => void;
  cart: Icart[] | null;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartContext = createContext<IcontextProps>({
  remove: () => {},
  add: () => {},
  cart: [],
  cartOpen: false,
  setCartOpen: () => {},
});

export default function ShopProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Icart[] | []>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cart")) {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : null;
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function add(newItem: Icart) {
    console.log(newItem);
    setCartOpen(true);
    const newCart = [...cart!];
    for (let item of newCart) {
      if (item.id === newItem.id) {
        item.quantity += newItem.quantity;
        setCart(newCart);
        return;
      }
    }
    newCart.push(newItem);
    setCart(newCart);
  }
  async function remove(item: string) {
    const updatedCart = cart!.filter((items) => items.id !== item);
    setCart(updatedCart);
    if (cart!.length === 1) {
      setCartOpen(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        remove,
        add,
        cart,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
