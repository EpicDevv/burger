"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import InputModal from "./InputModal";

const SearchInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex cursor-pointer justify-end flex-1 sm:hidden"
      >
        <MagnifyingGlassIcon
          className="h-6 w-6 text-[#008170]"
          aria-hidden="true"
        />
      </div>
      <InputModal open={open} setOpen={setOpen} />
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="sm:flex cursor-pointer hidden flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
      >
        <div className=" w-full max-w-md lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-[#008170]"
                aria-hidden="true"
              />
            </div>
            <div className="block w-full outline-none rounded-md border-0 dark:bg-[#232d3f] bg-white py-1.5 pl-10 pr-3 text-[#008170] ring-1 ring-inset ring-[#008170] dark:text-[#008170]  placeholder:text-gray-400  sm:text-sm sm:leading-6">
              Search
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
