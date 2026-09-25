import { Product as ProductType } from "@/interfaces/product";

export function Description({ product }: { product: ProductType }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: product.prodDescription }} />
    </div>
  );
}
