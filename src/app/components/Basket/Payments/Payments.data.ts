export const paymentsData = [
  {
    id: 1,
    name: "Contrarreembolso",
    description: "Paga solo cuando recibas el producto",
  },
  {
    id: 2,
    name: "En recepción",
    description: "Paga en recepción y recibe tu producto",
  },
];

export interface paymentType {
  id: number;
  name: string;
  description: string;
}
