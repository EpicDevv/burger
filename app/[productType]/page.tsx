import ProductList from "../../components/ProductList";
import { notFound } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    productType: string;
  };
}) {
  const { productType } = params;
  if (productType !== "burger") {
    notFound();
  }
  return (
    <div className="bg-white dark:bg-[#0f0f0f]">
      <ProductList />
    </div>
  );
}
