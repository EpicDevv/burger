"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
interface Icart {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  quantity: number;
  additionalItems?: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    calorie: number;
  } | null;
}

interface IcontextProps {
  remove: (item: string) => void;
  add: (newItem: Icart) => void;
  updateQuantity: (value: string, product: Icart) => void;
  cart: Icart[] | null;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: { products: Product[] };
}
const CartContext = createContext<IcontextProps>({
  updateQuantity: () => {},
  remove: () => {},
  add: () => {},
  cart: [],
  cartOpen: false,
  setCartOpen: () => {},
  products: { products: [] },
});

export default function ShopProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: { products: Product[] };
}) {
  const router = useRouter();
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
    setCartOpen(true);
    const newCart = [...cart!];
    let friesAlreadyAdded = false;
    if (newItem.additionalItems) {
      for (let item of newCart) {
        if (item.id === newItem.additionalItems.id) {
          item.quantity += 1;
          friesAlreadyAdded = true;
        }
      }
      if (!friesAlreadyAdded) {
        newCart.push({ ...newItem.additionalItems, quantity: 1 });
      }
    }
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
      router.back();
      setCartOpen(false);
    }
  }

  async function updateQuantity(value: string, product: Icart) {
    const newCart = [...cart!];
    for (let item of newCart) {
      if (item.id === product.id) {
        item.quantity = Number(value);
        setCart(newCart);
      }
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
        updateQuantity,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
