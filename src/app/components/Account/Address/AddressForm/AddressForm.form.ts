import * as Yup from "yup";
import { AddressType } from "@/interfaces/address";

export function initialValues(address: AddressType | null) {
  return {
    addTitle: address?.addTitle || "",
    addName: address?.addName || "",
    addAddress: address?.addAddress || "",
    addCity: address?.addCity || "",
    addState: address?.addState || "",
    addPostalCode: address?.addPostalCode || "",
    addPhone: address?.addPhone || "",
  };
}

export function validationSchema() {
  return Yup.object({
    addTitle: Yup.string().required(),
    addName: Yup.string().required(),
    addAddress: Yup.string().required(),
    addCity: Yup.string().required(),
    addState: Yup.string().required(),
    addPostalCode: Yup.string().required(),
    addPhone: Yup.number().required(),
  });
}
