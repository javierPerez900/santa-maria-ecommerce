"use client";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import BasicModal from "@/app/components/Modal/BasicModal";
import ConfirmModal from "@/app/components/Modal/ConfirmModal";
import { AddressForm } from "../../AddressForm";
import { addressCtrl } from "@/api";
import { AddressType } from "@/interfaces/address";

export function Address({
  address,
  onReload,
}: {
  address: AddressType;
  onReload: () => void;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCtrl.delete(address.addId);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: "20px",
          mb: "20px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& > div": {
            display: "flex",
          },
        }}
      >
        <Box>
          <Typography
            component="p"
            sx={{ mr: "5px", fontWeight: "bold", fontSize: "16px" }}
          >
            {address.addTitle}
          </Typography>
          <Typography
            component="p"
            sx={{ color: "text.secondary", fontSize: "16px" }}
          >
            {address.addName}, {address.addAddress}, {address.addState},{" "}
            {address.addCity}, {address.addPostalCode}
          </Typography>
        </Box>

        <Box
          sx={{
            "& > button": {
              p: "12px",
              ml: "10px",
              "& svg": {
                color: "primary.contrastText",
              },
            },
          }}
        >
          <Button onClick={openCloseEdit} sx={{ bgcolor: "primary.main" }}>
            <CreateIcon />
          </Button>
          <Button onClick={onOpenCloseConfirm} sx={{ bgcolor: "primary.main" }}>
            <CloseIcon />
          </Button>
        </Box>
      </Box>

      <ConfirmModal
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de que quieres eliminar la dirección (${address.addTitle})?`}
      ></ConfirmModal>

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          address={address}
        />
      </BasicModal>
    </>
  );
}
