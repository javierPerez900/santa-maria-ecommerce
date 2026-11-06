"use client";
import { useState } from "react";
import { Button, Box, Typography, TextField, Chip } from "@mui/material";
import { useBasket } from "@/hooks";
import { fn } from "@/utils/functions";
import { Product as ProductType } from "@/interfaces/product";

const parseQty = (value: string) => (value === "" ? 0 : Number(value));

export function Info({ product }: { product: ProductType }) {
  const { addBasket, changeQuantityItem } = useBasket();
  const [loading, setLoading] = useState(false);
  const [boxesStr, setBoxesStr] = useState("0");
  const [unitsStr, setUnitsStr] = useState("1");

  const sellOnlyUnit = product.prodSellOnlyUnit === 1;

  const boxesNum = parseQty(boxesStr);
  const unitsNum = parseQty(unitsStr);
  const totalUnits = sellOnlyUnit
    ? unitsNum
    : boxesNum * product.prodUnitsPerBox + unitsNum;

  const wholesale = fn.isWholesale(totalUnits, product);
  const totalPrice = fn.computeTotalPrice(totalUnits, product);

  const handleBoxesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      setBoxesStr(value);
    }
  };

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value !== "" && !/^[0-9]+$/.test(value)) return;

    if (value === "" || sellOnlyUnit) {
      setUnitsStr(value);
      return;
    }

    const numValue = Number(value);
    const unitsPerBox = product.prodUnitsPerBox;

    if (unitsPerBox > 0 && numValue >= unitsPerBox) {
      const carry = Math.floor(numValue / unitsPerBox);
      const remainder = numValue % unitsPerBox;

      setBoxesStr(String(parseQty(boxesStr) + carry));
      setUnitsStr(String(remainder));
    } else {
      setUnitsStr(value);
    }
  };

  const handleBoxesBlur = () => {
    if (boxesStr === "") setBoxesStr("0");
  };

  const handleUnitsBlur = () => {
    if (unitsStr === "") setUnitsStr("0");
  };

  const addBasketWrapper = () => {
    if (totalUnits <= 0) return;

    setLoading(true);
    addBasket(product.prodID);
    changeQuantityItem(product.prodID, totalUnits);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography
        variant="h1"
        sx={{ fontSize: "30px", mb: "5px", color: "text.primary" }}
      >
        {product.prodTitle}
      </Typography>
      <Typography
        sx={{ color: "warning.main", mb: "20px" }}
      >{`Queda(n) ${fn.formatStockByPackaging(product)}`}</Typography>

      {/* Bloque de precio */}
      <Box
        sx={{ display: "flex", alignItems: "baseline", gap: "10px", mb: "4px" }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "35px",
            lineHeight: 1,
          }}
        >
          S/. {totalPrice.toFixed(2)}
        </Typography>
        {wholesale && (
          <Chip
            label="Precio por mayor"
            size="small"
            sx={{
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              fontWeight: "bold",
              height: "22px",
            }}
          />
        )}
      </Box>
      <Typography
        sx={{ color: "text.secondary", fontSize: "13px", mb: "15px" }}
      >
        {totalUnits > 0
          ? wholesale
            ? `Aprox. S/. ${product.prodPriceWholesaleUnit.toFixed(2)} por unidad · ${totalUnits} unidad(es) en total`
            : `S/. ${product.prodPrice.toFixed(2)} por unidad`
          : "Elige una cantidad para ver el precio"}
      </Typography>

      {/* Precios de referencia */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          mb: "25px",
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          },
          "& > div > span:first-of-type": {
            color: "text.secondary",
          },
          "& > div > span:last-of-type": {
            color: "text.primary",
            fontWeight: 500,
          },
        }}
      >
        <Box>
          <span>Precio por unidad</span>
          <span>S/. {product.prodPrice.toFixed(2)}</span>
        </Box>
        {!sellOnlyUnit && (
          <>
            <Box>
              <span>{`Precio por caja (${product.prodUnitsPerBox} unidades)`}</span>
              <span>S/. {product.prodPriceBox.toFixed(2)}</span>
            </Box>
            {product.prodWholesaleMinQty > 0 && (
              <Box>
                <span>Precio por mayor desde</span>
                <span>{`${product.prodWholesaleMinQty} unidades`}</span>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Selector de cantidad */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          p: "16px",
          mb: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "text.primary",
            mb: "12px",
          }}
        >
          Cantidad
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {!sellOnlyUnit && (
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  padding: "8px 10px",
                },
              }}
              fullWidth
              label="Cajas"
              name="cantidadCajas"
              value={boxesStr}
              onChange={handleBoxesChange}
              onBlur={handleBoxesBlur}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />
          )}
          <TextField
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 10px",
              },
            }}
            fullWidth
            label="Unidades"
            name="cantidadUnidades"
            value={unitsStr}
            onChange={handleUnitsChange}
            onBlur={handleUnitsBlur}
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                pattern: "[0-9]*",
              },
            }}
          />
        </Box>

        {!sellOnlyUnit && (boxesNum > 0 || unitsNum > 0) && (
          <Typography
            sx={{ fontSize: "12px", color: "text.secondary", mt: "10px" }}
          >
            {`= ${totalUnits} unidad(es) en total (${product.prodUnitsPerBox} unidades por caja)`}
          </Typography>
        )}
      </Box>

      <Button
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
        onClick={addBasketWrapper}
        loading={loading}
        disabled={totalUnits <= 0}
      >
        Comprar
      </Button>
    </Box>
  );
}
