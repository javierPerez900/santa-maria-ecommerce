"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { orderCtrl } from "@/api";
import { useBasket } from "@/hooks/useBasket";
import { fn } from "@/utils/functions";
import { BasketProduct } from "@/interfaces/product";
import { AddressType } from "@/interfaces/address";

export function Resume({
  products,
  nextStep,
  address,
  nextDisabled = false,
}: {
  products: BasketProduct[];
  nextStep: number;
  address: AddressType;
  nextDisabled: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deleteAllItems } = useBasket();

  // Total estimado, solo para mostrarlo. El servidor recalcula el precio real al crear la orden.
  const total = products.reduce(
    (acc, product) => acc + fn.computeTotalPrice(product.quantity, product),
    0,
  );

  const onPay = async () => {
    try {
      setLoading(true);

      // Solo se envía qué se compra (producto y unidades) y el Id de dirección.
      // Los precios y el total los calcula el servidor.
      const data = {
        orderAddId: address.addId,
        orderDetails: products.map((product) => ({
          odProdId: product.prodID,
          odQuantity: product.quantity,
        })),
      };

      await orderCtrl.create(data);
      deleteAllItems();
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", nextStep.toString());
      router.replace(`?${params.toString()}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!total) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: "20px",
        mt: "38px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "6px",

        "& > h2": {
          fontSize: "16px",
          mb: "10px",
          color: "text.primary",
        },
      }}
    >
      <h2>Resumen</h2>
      <Box
        sx={{
          mb: "20px",
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            mt: "10px",

            "&:last-of-type > span:last-of-type": {
              fontSize: "20px",
              fontWeight: "bold",
            },

            "& > span": {
              color: "text.primary",
            },
          },
        }}
      >
        <Box>
          <span>Total</span>
          <span>S/ {total.toFixed(2)}</span>
        </Box>
      </Box>
      <Button
        fullWidth
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
        disabled={nextDisabled}
        onClick={onPay}
        loading={loading}
      >
        Pagar
      </Button>
    </Box>
  );
}
