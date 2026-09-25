import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    repeatPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "La contraseña no es igual"),
  });
}
