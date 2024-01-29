"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ShopProvider from "../context/ShopContext";
import { Product } from "@/types";

export function Providers({
  children,
  products,
}: {
  children: React.ReactNode;
  products: { products: Product[] };
}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ShopProvider products={products}>{children}</ShopProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
