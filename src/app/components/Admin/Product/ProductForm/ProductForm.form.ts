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
    ProdPriceBox: product?.prodPriceBox || "",
    ProdUnitsPerBox: product?.prodUnitsPerBox || "",
    ProdWholesaleMinQty: product?.prodWholesaleMinQty || "",
    ProdPriceWholesaleUnit: product?.prodPriceWholesaleUnit || "",
    ProdSellOnlyUnit: product?.prodSellOnlyUnit ?? "",
  };
}

export function validationSchema() {
  return Yup.object({
    ProdTitle: Yup.string().required(),
    ProdDescription: Yup.string().required(),
    ProdPrice: Yup.number().required(),
    ProdStock: Yup.number().integer().required(),
    ProdPath: Yup.string().required(),
    ProdCategId: Yup.number().required(),
    ProdPriceBox: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .when("ProdSellOnlyUnit", {
        is: 0,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    ProdUnitsPerBox: Yup.number()
      .integer()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .when("ProdSellOnlyUnit", {
        is: 0,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),

    ProdWholesaleMinQty: Yup.number()
      .integer()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .when("ProdSellOnlyUnit", {
        is: 0,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),

    ProdPriceWholesaleUnit: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .when("ProdSellOnlyUnit", {
        is: 0,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    ProdSellOnlyUnit: Yup.number().required(),
  });
}
