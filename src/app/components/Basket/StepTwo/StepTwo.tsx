import { Box, Container } from "@mui/material";
import { Resume } from "../Resume";
import { Addresses } from "./Addresses";
import { BasketProduct } from "@/interfaces/product";
import { AddressType } from "@/interfaces/address";

export function StepTwo({
  products,
  address,
  setAddress,
  nextDisabled,
}: {
  products: BasketProduct[];
  address: AddressType | null;
  setAddress: (address: AddressType) => void;
  nextDisabled: boolean;
}) {
  return (
    <Container sx={{ display: "flex !important" }}>
      <Box sx={{ width: "65%", pr: "20px" }}>
        <Addresses address={address} setAddress={setAddress} />
      </Box>
      <Box sx={{ width: "35%", pl: "20px" }}>
        <Resume
          products={products}
          nextStep={3}
          btnText="Proceder con el pago"
          nextDisabled={nextDisabled}
        />
      </Box>
    </Container>
  );
}
