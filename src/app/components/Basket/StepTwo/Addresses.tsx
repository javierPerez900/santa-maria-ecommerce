import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import { map, size } from "lodash";
import { Loading, NoResult } from "../../Shared";
import { addressCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { AddressType } from "@/interfaces/address";

export function Addresses({
  address,
  setAddress,
}: {
  address: AddressType | null;
  setAddress: (address: AddressType) => void;
}) {
  const [addresses, setAddresses] = useState<AddressType[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        setAddresses(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

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
      <h2>Dirección de envío</h2>

      {!addresses && <Loading text="Cargando direcciones" />}

      {addresses && size(addresses) === 0 && (
        <Box sx={{ textAlign: "center" }}>
          <NoResult text="No tienes ninguna dirección creada" />
          <Button
            component={Link}
            href="/account"
            sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
          >
            Crear dirección
          </Button>
        </Box>
      )}

      {map(addresses, (item) => {
        const isSelected = item.addId === address?.addId;
        return (
          <Box
            key={item.addId}
            onClick={() => setAddress(item)}
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
              <p>{item.addTitle}</p>
              <p>
                {item.addName}, {item.addAddress}, {item.addState},{" "}
                {item.addCity}, {item.addPostalCode}
              </p>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
