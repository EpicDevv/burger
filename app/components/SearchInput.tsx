"use-client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchInput = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div className="w-full max-w-md lg:max-w-xs">
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
          <input
            id="search"
            name="search"
            className="block w-full outline-none rounded-md border-0 dark:bg-[#232d3f] bg-white py-1.5 pl-10 pr-3 text-[#008170] ring-1 ring-inset ring-[#008170] dark:text-[#008170]  placeholder:text-gray-400  sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
