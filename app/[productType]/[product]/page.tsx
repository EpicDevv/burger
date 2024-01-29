import { fetchBurgers } from "../../../lib/data";
import { convertNameToUrl } from "../../../utils/helpers";
import ProductDetailsPage from "../../../components/ProductDetailsPage";
import { Product } from "@/types";
export async function generateStaticParams() {
  const products = await fetchBurgers();
  return products.products.map((product: Product) => {
    const productNameToUrl = convertNameToUrl(product.name);
    return {
      productType: "burger",
      product: productNameToUrl,
    };
  });
}

export default function Page({
  params,
}: {
  params: { productType: string; product: string };
}) {
  return <ProductDetailsPage product={params.product} />;
}
