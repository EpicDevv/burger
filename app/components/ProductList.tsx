import { fetchBurgers } from "../lib/data";
import Link from "next/link";
import { convertNameToUrl } from "../utils/helpers";
export default async function ProductList() {
  const burgers = await fetchBurgers();
  return (
    <div className="bg-white dark:bg-[#0f0f0f]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {burgers.products.map((burger: any) => {
            return (
              <Link
                href={`burger/${convertNameToUrl(burger.name)}`}
                key={burger.id}
              >
                <div className="group relative flex flex-col overflow-hidden rounded-lg border border-[#008170] bg-white dark:bg-[#0f0f0f]">
                  <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <img
                      src={burger.image}
                      alt={burger.name}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-lg font-medium text-[#008170]">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {burger.name}
                    </h3>
                    <p className="text-sm text-black/90 dark:text-white/90">
                      {burger.description}
                    </p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic dark:text-white text-white">
                        {burger.options}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-base font-medium text-gray-900 dark:text-[#008170]">
                          $ {(burger.price / 100).toFixed(2)}
                        </p>
                        <div className="text-black/90 dark:text-[#008170]">
                          calories {burger.calorie}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
