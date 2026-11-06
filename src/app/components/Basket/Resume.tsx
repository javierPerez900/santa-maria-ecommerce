"use client";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { forEach } from "lodash";
import { useAuth } from "@/hooks";
import { fn } from "@/utils/functions";
import { BasketProduct } from "@/interfaces/product";

export function Resume({
  products,
  nextStep,
  btnText,
  nextDisabled = false,
}: {
  products: BasketProduct[];
  nextStep: number;
  btnText: string;
  nextDisabled?: boolean;
}) {
  const [total, setTotal] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += fn.computeTotalPrice(product.quantity, product);
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura inicial de localStorage, no disponible durante SSR
    setTotal(totalTemp);
  }, [products]);

  const goToNextStep = () => {
    if (user) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", nextStep.toString());
      router.replace(`?${params.toString()}`);
    } else {
      router.push("/join/login");
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
          <span>S/ {total?.toFixed(2)}</span>
        </Box>
      </Box>
      <Button
        fullWidth
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
        disabled={nextDisabled}
        onClick={goToNextStep}
      >
        {btnText}
      </Button>
    </Box>
  );
}
