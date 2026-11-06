import { Box } from "@mui/material";
import { map } from "lodash";
import { paymentsData, paymentType } from "./Payments.data";

export function Payments({
  paymentSelected,
  setPaymentSelected,
}: {
  paymentSelected: paymentType | null;
  setPaymentSelected: (payment: paymentType) => void;
}) {
  return (
    <Box
      sx={{
        "& > h2": {
          mb: "15px",
          fontSize: "18px",
          color: "text.primary",
        },
      }}
    >
      <h2>Métodos de pago</h2>

      {map(paymentsData, (item) => {
        const isSelected = item.id === paymentSelected?.id;
        return (
          <Box
            key={item.id}
            onClick={() => setPaymentSelected(item)}
            sx={{
              border: "1px solid",
              borderColor: isSelected ? "primary.main" : "divider",
              borderWidth: isSelected ? "2px !important" : undefined,
              "& > div > p:nth-of-type(1)": {
                color: isSelected ? "primary.main" : undefined,
              },

              p: "20px",
              mb: "20px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              "&:hover": {
                cursor: "pointer",
                opacity: "0.8",
              },

              "& > div": {
                display: "flex",
              },
            }}
          >
            <Box
              sx={{
                "& > p:nth-of-type(1)": {
                  mr: "5px",
                  fontWeight: "bold",
                  fontSize: "16px",
                },
                "& > p:nth-of-type(2)": {
                  color: "text.secondary",
                  fontSize: "16px",
                },
              }}
            >
              <p>{item.name}: </p>
              <p>{item.description}</p>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
