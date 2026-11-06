import { Product as ProductType } from "@/interfaces/product";

export function isWholesale(totalUnits: number, product: ProductType) {
  return (
    product.prodSellOnlyUnit !== 1 &&
    product.prodWholesaleMinQty > 0 &&
    totalUnits >= product.prodWholesaleMinQty &&
    product.prodUnitsPerBox > 0 &&
    product.prodPriceBox > 0
  );
}
