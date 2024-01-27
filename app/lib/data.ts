export async function fetchBurgers() {
  try {
    const res = await fetch("https://burgerhub00.github.io/data/products.json");
    return res.json();
  } catch (error) {
    console.error("fetch error", error);
    throw new Error("Failed to fetch burgers.");
  }
}
