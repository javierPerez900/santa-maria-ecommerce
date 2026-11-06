import { Product as ProductType } from "@/interfaces/product";
import { isWholesale } from "./isWholesale";

const toCents = (amount: number) => Math.round(amount * 100);

export function computeTotalPrice(totalUnits: number, product: ProductType) {
  if (totalUnits <= 0) return 0;

  if (isWholesale(totalUnits, product)) {
    const unitsPerBox = product.prodUnitsPerBox;
    const totalCents = Math.floor(
      (toCents(product.prodPriceBox) * totalUnits +
        Math.floor(unitsPerBox / 2)) /
        unitsPerBox,
    );
    return totalCents / 100;
  }

  return (toCents(product.prodPrice) * totalUnits) / 100;
}
