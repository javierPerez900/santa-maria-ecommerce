import * as Yup from "yup";
import { Product as ProductType } from "@/interfaces/product";

export function initialValues(product: ProductType | null) {
  return {
    ProdTitle: product?.prodTitle || "",
    ProdDescription: product?.prodDescription || "",
    ProdPrice: product?.prodPrice || "",
    ProdStock: product?.prodStock || "",
    ProdPath: product?.prodPath || "",
    ProdCategId: product?.prodCategId || "",
    prodPriceBox: product?.prodPriceBox || "",
    prodUnitsPerBox: product?.prodUnitsPerBox || "",
    prodWholesaleMinQty: product?.prodWholesaleMinQty || "",
    prodPriceWholesaleUnit: product?.prodPriceWholesaleUnit || "",
    prodSellOnlyUnit: product?.prodSellOnlyUnit || "",
  };
}

export function validationSchema() {
  return Yup.object({
    ProdTitle: Yup.string().required(),
    ProdDescription: Yup.string().required(),
    ProdPrice: Yup.number().required(),
    ProdStock: Yup.number().required(),
    ProdPath: Yup.string().required(),
    ProdCategId: Yup.number().required(),
    prodPriceBox: Yup.number().required(),
    prodUnitsPerBox: Yup.number().required(),
    prodWholesaleMinQty: Yup.number().required(),
    prodPriceWholesaleUnit: Yup.number().required(),
    prodSellOnlyUnit: Yup.number().required(),
  });
}
