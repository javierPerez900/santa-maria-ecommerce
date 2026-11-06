"use client";
import { useState } from "react";
import { TableCell, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@/app/components/Modal/BasicModal";
import { CategoryForm } from "../../CategoryForm";
import ConfirmModal from "@/app/components/Modal/ConfirmModal";
import { categoryCtrl } from "@/api";

interface CategoryType {
  categID: number;
  categName: string;
  categPath: string;
}

interface CategoryProps {
  category: CategoryType;
  onReload: () => void;
}

export function Category({ category, onReload }: CategoryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseModal = () => setOpenModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await categoryCtrl.delete(category.categID);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableCell>{category.categID}</TableCell>
      <TableCell>{category.categName}</TableCell>
      <TableCell>{category.categPath}</TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1.5,
            "& svg": {
              cursor: "pointer",
              fontSize: 24,
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          <EditIcon onClick={onOpenCloseModal} />
          <DeleteIcon onClick={onOpenCloseConfirm} />
        </Box>
      </TableCell>
      <ConfirmModal
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de eliminar la categoría (${category.categName})?`}
      ></ConfirmModal>
      <Modal
        show={openModal}
        onClose={onOpenCloseModal}
        title={`Editar (${category.categName})`}
      >
        <CategoryForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          category={category}
        />
      </Modal>
    </>
  );
}
