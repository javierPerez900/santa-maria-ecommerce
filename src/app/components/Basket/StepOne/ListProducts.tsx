import Image from "next/image";
import { Box, TextField, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { map } from "lodash";
import { useBasket } from "@/hooks";
import { fn } from "@/utils/functions";
import { BasketProduct } from "@/interfaces/product";

export function ListProducts({ products }: { products: BasketProduct[] }) {
  const { changeQuantityItem, deleteItem } = useBasket();

  const options = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <Box
      sx={{
        "& > h2": {
          mb: "15px",
          fontSize: "18px",
        },
      }}
    >
      <h2>Cesta</h2>
      {map(products, (product) => (
        <Box
          key={product.prodID}
          sx={{
            display: "flex",
            mb: "20px",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "5px",
            p: "20px 10px",
            "& > div": {
              display: "flex",
              width: "100%",
            },
          }}
        >
          <Image
            src={fn.getUrlImage(product.prodID)}
            alt={product.prodTitle}
            width={120}
            height={120}
            style={{ marginRight: "20px" }}
          />
          <Box>
            <Box
              sx={{
                width: "100%",
                "& p": {
                  fontWeight: "bold",
                },
              }}
            >
              <p>{product.prodTitle}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& > span": {
                  m: "0 10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "primary.main",
                },
                "& > svg": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",

                  "&:hover": {
                    color: "error.main",
                  },
                },
              }}
            >
              <TextField
                sx={{
                  mb: 0.5,
                  "& .MuiSelect-select": {
                    padding: "4px 10px",
                  },
                }}
                select
                hiddenLabel
                name="cantidad"
                placeholder="Cantidad del producto"
                slotProps={{
                  select: {
                    displayEmpty: true,
                    renderValue: (value) => {
                      if (!value)
                        return (
                          <span style={{ color: "#aaa" }}>
                            Cantidad del producto
                          </span>
                        );
                      const opt = options.find((o) => o.value === value);
                      return opt?.text || "";
                    },
                  },
                }}
                value={product.quantity}
                onChange={(e) =>
                  changeQuantityItem(product.prodID, Number(e.target.value))
                }
              >
                <MenuItem disabled value="">
                  <em>Cantidad del producto</em>
                </MenuItem>
                {options.map((opt) => (
                  <MenuItem key={opt.key} value={opt.value}>
                    {opt.text}
                  </MenuItem>
                ))}
              </TextField>
              <span>S/{product.prodPrice}</span>
              <DeleteIcon onClick={() => deleteItem(product.prodID)} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
