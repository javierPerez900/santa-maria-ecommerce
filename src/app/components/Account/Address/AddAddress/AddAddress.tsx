import { useState } from "react";
import BasicModal from "@/app/components/Modal/BasicModal";
import { Button } from "@mui/material";
import { AddressForm } from "../AddressForm";

export function AddAddress({ onReload }: { onReload: () => void }) {
  const [showModal, setShowModal] = useState(false);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Button
        variant="contained"
        onClick={onCloseOpenModal}
        sx={{
          maxWidth: "200px",
          textTransform: "none",
          color: "white",
          bgcolor: "primary.main",
        }}
      >
        Nueva dirección
      </Button>
      <BasicModal
        show={showModal}
        onClose={onCloseOpenModal}
        title="Nueva dirección"
      >
        <AddressForm onClose={onCloseOpenModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
