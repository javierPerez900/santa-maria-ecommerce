import * as Yup from "yup";

interface CategoryType {
  categID: number;
  categName: string;
  categPath: string;
}

export function initialValues(category: CategoryType | null) {
  return {
    CategName: category?.categName || "",
    CategPath: category?.categPath || "",
  };
}

export function validationSchema() {
  return Yup.object({
    CategName: Yup.string().required(),
    CategPath: Yup.string().required(),
  });
}
