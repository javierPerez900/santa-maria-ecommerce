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

export type ProductFormValues = ReturnType<typeof initialValues>;

export function toPayload(values: ProductFormValues) {
  const sellOnlyUnit = Number(values.ProdSellOnlyUnit) === 1;

  const payload: Record<string, string | number> = {
    ProdTitle: values.ProdTitle.trim(),
    ProdDescription: values.ProdDescription,
    ProdPath: values.ProdPath.trim(),
    ProdCategId: Number(values.ProdCategId),
    ProdPrice: Number(values.ProdPrice),
    ProdStock: Number(values.ProdStock),
    ProdSellOnlyUnit: Number(values.ProdSellOnlyUnit),
  };

  if (!sellOnlyUnit) {
    payload.ProdPriceBox = Number(values.ProdPriceBox);
    payload.ProdUnitsPerBox = Number(values.ProdUnitsPerBox);
    payload.ProdWholesaleMinQty = Number(values.ProdWholesaleMinQty);
  }

  return payload;
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
