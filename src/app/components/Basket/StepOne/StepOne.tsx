import { Container, Box } from "@mui/material";
import { Resume } from "../Resume";
import { BasketProduct } from "@/interfaces/product";
import { ListProducts } from "./ListProducts";

export function StepOne({ products }: { products: BasketProduct[] }) {
  return (
    <Container sx={{ display: "flex" }}>
      <Box sx={{ width: "65%", pl: "20px" }}>
        <ListProducts products={products} />
      </Box>
      <Box sx={{ width: "35%", pl: "20px" }}>
        <Resume
          products={products}
          nextStep={2}
          btnText="Proceder con la dirección"
        />
      </Box>
    </Container>
  );
}
