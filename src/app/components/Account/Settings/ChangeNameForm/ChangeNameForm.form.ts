import * as Yup from "yup";

export function initialValues(userFirstName: string, userLastName: string) {
  return {
    userFirstName: userFirstName || "",
    userLastName: userLastName || "",
  };
}

export function validationSchema() {
  return Yup.object({
    userFirstName: Yup.string().required(),
    userLastName: Yup.string().required(),
  });
}
