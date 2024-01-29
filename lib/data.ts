import { convertNameToUrl } from "../app/utils/helpers";

export async function fetchBurgers() {
  try {
    const res = await fetch(
      "https://burgerhub00.github.io/data/products.json",
      {
        next: {
          revalidate: 10,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.error("fetch error", error);
    throw new Error("Failed to fetch burgers.");
  }
}

export async function fetchProduct(name: string) {
  const products = await fetchBurgers();
  return products.products.filter((item: any) => {
    return convertNameToUrl(item.name) === name;
  })[0];
}

export async function fetchFries() {
  const products = await fetchBurgers();
  return products.products.filter((item: any) => {
    return item.name === "Fries with Ketchup";
  });
}
