"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ShopProvider from "./context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ShopProvider>{children}</ShopProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
