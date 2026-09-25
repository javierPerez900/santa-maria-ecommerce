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
            sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
          >
            Crear dirección
          </Button>
        </Box>
      )}

      {map(addresses, (item) => (
        <Box
          key={item.addId}
          onClick={() => setAddress(item)}
          sx={{
            borderColor:
              item.addId === address?.addId
                ? "primary.main !important"
                : "divider !important",
            borderWidth:
              item.addId === address?.addId ? "2px !important" : undefined,
            "& > div > p:nth-of-type(1)": {
              color:
                item.addId === address?.addId
                  ? "primary.main !important"
                  : undefined,
            },
            border: "1px solid",
            p: "20px",
            mb: "20px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            "&:hover": {
              cursor: "pointer",
              opacity: "0.6",
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
              {item.addName}, {item.addAddress}, {item.addState}, {item.addCity}
              , {item.addPostalCode}
            </p>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
