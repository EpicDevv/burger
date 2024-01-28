import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CartCount } from "./CartCount";
import { leckerli } from "../ui/fonts";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import { ThemeSelector } from "./ThemeSelector";
import SearchInput from "./SearchInput";
import CartToggle from "./CartToggle";
import MiniCart from "./MiniCart";

interface Icart {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  quantity: number;
}

export function Header() {
  return (
    <div className="border-b border-gray-900/10 dark:border-white/10 flex items-center justify-between gap-x-3 dark:bg-[#0f0f0f] bg-white px-3 py-3 lg:px-5 lg:py-4">
      <div className="flex gap-x-3">
        <Link href="/">
          <div className="flex">
            <span className=" py-1 font-semibold px-6 mr-3 bg-[#0F0] text-[27px] rounded-full antialiased text-black">
              <span className={`${leckerli.className} text-[30px] antialiased`}>
                B
              </span>
              URGER
            </span>
          </div>
        </Link>
      </div>
      <SearchInput />
      <div className="flex items-center justify-center">
        <div className="flex mr-3 flex-1 justify-end">
          <div className="relative z-10">
            <ThemeSelector />
          </div>
        </div>
        <div className="flex shrink-0 gap-x-3">
          <CartToggle>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full dark:bg-[#232D3F] border-1 border-[#008170] text-white">
              <ShoppingCartIcon className="w-6 text-[#008170] dark:text-[#008170]" />
              <CartCount />
            </div>
          </CartToggle>
          <MiniCart />
          {/* add user pfp */}
          {/* <Image
          src=""
          className="rounded-full"
          width={40}
          height={40}
          alt="User"
          priority
        /> */}
        </div>
      </div>
    </div>
  );
}
