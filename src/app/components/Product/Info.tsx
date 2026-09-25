"use client";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useBasket } from "@/hooks";
import { Product as ProductType } from "@/interfaces/product";

export function Info({ product }: { product: ProductType }) {
  const [loading, setLoading] = useState(false);
  const { addBasket } = useBasket();

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodID);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h1" sx={{ fontSize: "30px", mb: "5px" }}>
        {product.prodTitle}
      </Typography>
      <Typography
        sx={{ color: "warning.main", mb: "5px" }}
      >{`Quedan ${product.prodStock} unidad/es`}</Typography>
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "35px",
          mt: "15px",
          mb: "50px",
        }}
      >
        S/.{product.prodPrice}
      </Typography>
      <Button
        sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Comprar
      </Button>
    </Box>
  );
}
