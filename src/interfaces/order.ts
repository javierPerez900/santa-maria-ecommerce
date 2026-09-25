export interface OrderType {
  OrderDetails: OrderDetailsType[];
  orderAddId: number;
  orderDate: string;
  orderId: number;
  orderTotal: number;
  orderUserUUID: string;
}

export interface OrderDetailsType {
  odId: number;
  odOrderId: number;
  odProdId: number;
  odQuantity: number;
  odPresentation: string;
  odUnitPrice: number;
  odPrice: number;
}
