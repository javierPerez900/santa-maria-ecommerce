import Image from "next/image";
import { Box, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { map } from "lodash";
import { useBasket } from "@/hooks";
import { fn } from "@/utils/functions";
import { BasketProduct } from "@/interfaces/product";

const parseQty = (value: string) => (value === "" ? 0 : Number(value));
const isDigits = (value: string) => value === "" || /^[0-9]+$/.test(value);

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const splitQuantity = (product: BasketProduct) => {
  if (product.prodSellOnlyUnit === 1 || product.prodUnitsPerBox <= 0) {
    return { boxes: 0, units: product.quantity };
  }

  return {
    boxes: Math.floor(product.quantity / product.prodUnitsPerBox),
    units: product.quantity % product.prodUnitsPerBox,
  };
};

export function ListProducts({ products }: { products: BasketProduct[] }) {
  const { changeQuantityItem, deleteItem } = useBasket();

  const handleBoxesChange = (e: InputEvent, product: BasketProduct) => {
    const value = e.target.value;
    if (!isDigits(value)) return;

    const { units } = splitQuantity(product);
    changeQuantityItem(
      product.prodID,
      parseQty(value) * product.prodUnitsPerBox + units,
    );
  };

  const handleUnitsChange = (e: InputEvent, product: BasketProduct) => {
    const value = e.target.value;
    if (!isDigits(value)) return;

    if (product.prodSellOnlyUnit === 1) {
      changeQuantityItem(product.prodID, parseQty(value));
      return;
    }

    const { boxes } = splitQuantity(product);
    changeQuantityItem(
      product.prodID,
      boxes * product.prodUnitsPerBox + parseQty(value),
    );
  };

  const handleBlur = (product: BasketProduct) => {
    if (product.quantity <= 0) changeQuantityItem(product.prodID, 1);
  };

  const inputProps = {
    htmlInput: { inputMode: "numeric", pattern: "[0-9]*" },
  } as const;

  return (
    <Box
      sx={{
        "& > h2": {
          color: "text.primary",
          mb: "15px",
          fontSize: "18px",
        },
      }}
    >
      <h2>Cesta</h2>
      {map(products, (product) => {
        const sellOnlyUnit = product.prodSellOnlyUnit === 1;
        const { boxes, units } = splitQuantity(product);
        const wholesale = fn.isWholesale(product.quantity, product);

        return (
          <Box
            key={product.prodID}
            sx={{
              display: "flex",
              gap: "20px",
              mb: "20px",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "5px",
              p: "20px 10px",
            }}
          >
            <Image
              src={fn.getUrlImage(product.prodID)}
              alt={product.prodTitle}
              width={120}
              height={120}
              style={{ marginRight: "20px" }}
            />
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  "& p": {
                    fontWeight: "bold",
                    color: "text.primary",
                  },
                }}
              >
                <p>{product.prodTitle}</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{ width: "100%", mr: "20px", display: "flex", gap: 2 }}
                >
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
                      value={String(boxes)}
                      onChange={(e) => handleBoxesChange(e, product)}
                      onBlur={() => handleBlur(product)}
                      slotProps={inputProps}
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
                    value={String(units)}
                    onChange={(e) => handleUnitsChange(e, product)}
                    onBlur={() => handleBlur(product)}
                    slotProps={inputProps}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    "& > span:nth-of-type(1)": {
                      fontSize: "14px",
                      color: "text.secondary",
                    },
                    "& > span:nth-of-type(2)": {
                      m: "0 10px",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "primary.main",
                    },
                  }}
                >
                  <span>precio unitario:</span>
                  <span>
                    S/
                    {wholesale
                      ? product.prodPriceWholesaleUnit
                      : product.prodPrice}
                  </span>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    "&:hover": {
                      color: "error.main",
                    },
                  }}
                >
                  <DeleteIcon
                    onClick={() => deleteItem(product.prodID)}
                    sx={{ mr: "10px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
