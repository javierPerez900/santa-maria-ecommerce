export interface Product {
  prodCategId: number;
  prodCreatedAt: string;
  prodDescription: string;
  prodID: number;
  prodPath: string;
  prodPrice: number;
  prodPriceBox: number;
  prodUnitsPerBox: number;
  prodWholesaleMinQty: number;
  prodPriceWholesaleUnit: number;
  prodSellOnlyUnit: number;
  prodStock: number;
  prodTitle: string;
  prodUpdated: string;
}

export interface BasketProduct {
  prodCategId: number;
  prodCreatedAt: string;
  prodDescription: string;
  prodID: number;
  prodPath: string;
  prodPrice: number;
  prodPriceBox: number;
  prodUnitsPerBox: number;
  prodWholesaleMinQty: number;
  prodPriceWholesaleUnit: number;
  prodSellOnlyUnit: number;
  prodStock: number;
  prodTitle: string;
  prodUpdated: string;
  quantity: number;
}
