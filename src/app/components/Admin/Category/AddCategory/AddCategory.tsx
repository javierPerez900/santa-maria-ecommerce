import { Button } from "@mui/material";
import BasicModal from "@/app/components/Modal/BasicModal";
import { useState } from "react";
import { CategoryForm } from "../CategoryForm";

export function AddCategory({ onReload }: { onReload: () => void }) {
  const [openModal, setOpenModal] = useState(false);

  const openCloseModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <Button variant="contained" onClick={openCloseModal}>
        Nuevo Categoría
      </Button>
      <BasicModal
        show={openModal}
        onClose={openCloseModal}
        title="Nuevo Categoría"
      >
        <CategoryForm onClose={openCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
