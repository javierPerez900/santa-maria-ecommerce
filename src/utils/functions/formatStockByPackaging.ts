import { Product as ProductType } from "@/interfaces/product";

export function formatStockByPackaging(product: ProductType) {
  const stock = product.prodStock;
  const unitsPerBox = product.prodUnitsPerBox;

  if (product.prodSellOnlyUnit === 1) {
    return stock === 1 ? "1 unidad" : `${stock} unidades`;
  }

  if (!unitsPerBox || unitsPerBox <= 0) {
    return stock === 1 ? "1 unidad" : `${stock} unidades`;
  }

  const boxes = Math.floor(stock / unitsPerBox);
  const units = stock % unitsPerBox;

  const boxesText = boxes === 1 ? "1 caja" : boxes > 0 ? `${boxes} cajas` : "";

  const unitsText =
    units === 1 ? "1 unidad" : units > 0 ? `${units} unidades` : "";

  if (boxesText && unitsText) {
    return `${boxesText} y ${unitsText}`;
  }

  return boxesText || unitsText || "0 unidades";
}
