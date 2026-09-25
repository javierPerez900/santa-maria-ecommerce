import { useState, useEffect } from "react";
import { size, map } from "lodash";
import { addressCtrl } from "@/api";
import { Address } from "./Address";
import { Box } from "@mui/material";
import { Loading, NoResult } from "@/app/components/Shared";
import { AddressType } from "@/interfaces/address";

export function ListAddresses({
  reload,
  onReload,
}: {
  reload: boolean;
  onReload: () => void;
}) {
  const [addresses, setAddresses] = useState<AddressType[] | null>(null);

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
  }, [reload]);

  if (!addresses) {
    return <Loading text="Cargando direcciones" top={100} />;
  }

  return (
    <Box sx={{ mt: "50px" }}>
      {size(addresses) === 0 && <NoResult text="Crea tu primera dirección" />}
      {map(addresses, (address) => (
        <Address key={address.addId} address={address} onReload={onReload} />
      ))}
    </Box>
  );
}
