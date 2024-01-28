export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const convertNameToUrl = (name: string): string => {
  const removeSpecialCharacters = name.replace(/[^\w\s]/gi, "");
  return removeSpecialCharacters.replace(/\s+/g, "-").toLowerCase();
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
