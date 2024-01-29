import type { Metadata } from "next";
import { Providers } from "./providers";
import { inter } from "../ui/fonts";
import Layout from "../components/Layout";
import "./globals.css";
import { fetchBurgers } from "../lib/data";

export const metadata: Metadata = {
  title: "Burger",
  description: "Indulge in juicy goodness with every bite at our burger haven",
};

export default async function RootLayout({
  children,
  cartModal,
}: Readonly<{
  children: React.ReactNode;
  cartModal: React.ReactNode;
}>) {
  const products = await fetchBurgers();
  return (
    <html className="h-full" suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased h-full`}>
        <Providers products={products}>
          <Layout>
            <div>{children}</div>
            <div>{cartModal}</div>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
