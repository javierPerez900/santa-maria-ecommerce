import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Loading } from "@/app/components/Shared";
import { addressCtrl } from "@/api";
import { AddressType } from "@/interfaces/address";

export function AddressDetails({ addressId }: { addressId: number }) {
  const [address, setAddress] = useState<AddressType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getById(addressId);
        setAddress(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [addressId]);

  if (!address) return <Loading text="Cargando dirección" />;

  return (
    <Box sx={{ mt: "30px" }}>
      <h4>Dirección de envío:</h4>

      <Box
        sx={{
          backgroundColor: "background.paper",
          p: "20px",
          mb: "20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          mt: "10px",

          "& > div": {
            display: "flex",
          },
        }}
      >
        <p style={{ marginRight: "5px", fontWeight: "bold", fontSize: "16px" }}>
          {address.addTitle}
        </p>
        <Typography sx={{ color: "text.secondary", fontSize: "16px" }}>
          {address.addName}, {address.addAddress}, {address.addState},{" "}
          {address.addCity}, {address.addPostalCode}
        </Typography>
      </Box>
    </Box>
  );
}
