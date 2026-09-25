"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button } from "@mui/material";
import { forEach } from "lodash";
import { orderCtrl } from "@/api";
import { useBasket } from "@/hooks/useBasket";
import { BasketProduct } from "@/interfaces/product";
import { AddressType } from "@/interfaces/address";

interface OrderDetailsType {
  odProdId: number;
  odQuantity: number;
  odPrice: number;
}

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
  const [total, setTotal] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deleteAllItems } = useBasket();

  useEffect(() => {
    let totalTemp = 0;
    const orderDetailsTemp: OrderDetailsType[] = [];
    forEach(products, (product) => {
      totalTemp += product.prodPrice * product.quantity;
      orderDetailsTemp.push({
        odProdId: product.prodID,
        odQuantity: product.quantity,
        odPrice: product.prodPrice,
      });
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura inicial de localStorage, no disponible durante SSR
    setTotal(totalTemp);
    setOrderDetails(orderDetailsTemp);
  }, [products]);

  const onPay = async () => {
    try {
      setLoading(true);

      const data = {
        orderDate: new Date(),
        orderTotal: total,
        orderDetails: orderDetails,
        orderAddId: address.addId,
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
          <span>S/ {total?.toFixed(2)}</span>
        </Box>
      </Box>
      <Button
        fullWidth
        sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
        disabled={nextDisabled}
        onClick={onPay}
        loading={loading}
      >
        Pagar
      </Button>
    </Box>
  );
}
