import { Button } from "@mui/material";
import BasicModal from "@/app/components/Modal/BasicModal";
import { useState } from "react";
import { ProductForm } from "../ProductForm";

export function AddProduct({ onReload }: { onReload: () => void }) {
  const [openModal, setOpenModal] = useState(false);

  const openCloseModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <Button variant="contained" onClick={openCloseModal}>
        Nuevo producto
      </Button>
      <BasicModal
        show={openModal}
        onClose={openCloseModal}
        title="Nuevo Producto"
      >
        <ProductForm onClose={openCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
