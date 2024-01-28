import type { Metadata } from "next";
import { Providers } from "./providers";
import { inter } from "./ui/fonts";
import Layout from "./components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burger",
  description: "Indulge in juicy goodness with every bite at our burger haven",
};

export default function RootLayout({
  children,
  cartModal,
}: Readonly<{
  children: React.ReactNode;
  cartModal: React.ReactNode;
}>) {
  return (
    <html className="h-full" suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased h-full`}>
        <Providers>
          <Layout>
            <div>{children}</div>
            <div>{cartModal}</div>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
