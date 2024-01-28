import type { Metadata } from "next";
import { Providers } from "./providers";
import { inter } from "./ui/fonts";
import Layout from "./components/Layout";
import "./globals.css";

export const metadata: Metadata = {
  // metadataBase: new URL('https://burger.com'),
  title: "Burger",
  description: "Indulge in juicy goodness with every bite at our burger haven",
  openGraph: {
    title: "Burger",
    description:
      "Indulge in juicy goodness with every bite at our burger haven",
  },
  twitter: {
    // card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
