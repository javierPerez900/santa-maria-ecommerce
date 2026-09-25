import { useState } from "react";
import { Box, Container } from "@mui/material";
import { Resume } from "./Resume";
import { Payments } from "../Payments/Payments";
import { paymentType } from "../Payments/Payments.data";
import { AddressType } from "@/interfaces/address";
import { BasketProduct } from "@/interfaces/product";

export function StepThree({
  products,
  address,
}: {
  products: BasketProduct[];
  address: AddressType;
}) {
  const [paymentSelected, setPaymentSelected] = useState<paymentType | null>(
    null,
  );

  return (
    <Container sx={{ display: "flex !important" }}>
      <Box sx={{ width: "65%", pl: "20px" }}>
        <Payments
          paymentSelected={paymentSelected}
          setPaymentSelected={setPaymentSelected}
        />
      </Box>
      <Box sx={{ width: "35%", pl: "20px" }}>
        <Resume
          products={products}
          nextStep={4}
          address={address}
          nextDisabled={!paymentSelected}
        />
      </Box>
    </Container>
  );
}
