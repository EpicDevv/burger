import Link from "next/link";
import { fetchBurgers } from "../lib/data";
import { convertNameToUrl } from "../utils/helpers";
export default async function MoreHotProducts({ product }: { product: any }) {
  const products = await fetchBurgers();
  const filteredProducts = products.products.filter(
    (item: any) => product.name !== item.name
  );
  return (
    <div className="bg-white dark:bg-[#0F0F0F]">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight  text-[#008170]">
            More Hot Items!
          </h2>
          <Link
            href="#"
            className="hidden text-sm font-medium text-[#008170] hover:text-[#005B41] md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="group relative mb-5">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm dark:text-white text-[#008170]">
                <Link href={`/burger/${convertNameToUrl(product.name)}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm dark:text-white text-gray-500">
                calories {product.calorie}
              </p>
              <p className="mt-1 text-sm font-medium dark:text-white text-gray-900">
                $ {(product.price / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <Link
            href="#"
            className="font-medium text-[#008170] hover:text-[#005B41]"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
