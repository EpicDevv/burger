"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ShopProvider from "../context/ShopContext";

export function Providers({
  children,
  products,
}: {
  children: React.ReactNode;
  products: any;
}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ShopProvider products={products}>{children}</ShopProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
