import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { ProductDetailsForm } from "../components/ProductDetailsForm";
import { classNames } from "../utils/helpers";
import { fetchProduct } from "../lib/data";
import MoreHotProducts from "./MoreHotItems";
import Link from "next/link";
const reviews = { average: 4, totalCount: 1624 };

export default async function ProductDetailsPage({
  product,
}: {
  product: string;
}) {
  const productData = await fetchProduct(product);
  return (
    <div className="bg-white dark:bg-[#0F0F0F]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <Link
                    className="font-medium text-gray-500 dark:text-[#008170] hover:text-gray-900"
                    href={`/burger`}
                  >
                    burger
                  </Link>
                </div>
              </li>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300 dark:text-[#008170]"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <li>
                <div className="flex items-center text-sm">
                  <div className="font-medium dark:text-[#008170] text-gray-500 ">
                    {productData.name}
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">
              {productData.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 dark:text-white sm:text-xl">
                $ {(productData.price / 100).toFixed(2)}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-[#008170]"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500 dark:text-white/80">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500 dark:text-white/80">
                {productData.description}
              </p>
            </div>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500 dark:text-white/80">
                {productData.calorie} calories
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500 dark:text-white/80">
                Online order, delivery or pickup
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={productData.image}
              alt={`image of ${productData.name}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <ProductDetailsForm product={productData} />
      </div>
      {/* More Hot Products */}
      <MoreHotProducts />
    </div>
  );
}
