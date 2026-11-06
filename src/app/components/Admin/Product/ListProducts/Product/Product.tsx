import { useState, useEffect, ReactNode } from "react";
import { TableCell, Box } from "@mui/material";
import Image from "next/image";
import { fn } from "@/utils/functions";
import Modal from "@/app/components/Modal/BasicModal";
import ConfirmModal from "@/app/components/Modal/ConfirmModal";
import { ProductForm } from "../../ProductForm";
import { ProductImageForm } from "../../ProductImageForm";
import EditIcon from "@mui/icons-material/Edit";
import PhotoIcon from "@mui/icons-material/Photo";
import DeleteIcon from "@mui/icons-material/Delete";
import { productCtrl } from "@/api";
import { Product as ProductType } from "@/interfaces/product";

interface ProductProps {
  product: ProductType;
  onReload: () => void;
}

const NOT_FOUND_IMAGE = "/images/not-found.jpg";

export function Product({ product, onReload }: ProductProps) {
  const [image, setImage] = useState<string>(NOT_FOUND_IMAGE);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  useEffect(() => {
    const imageUrl = `${fn.getUrlImage(product.prodID)}?v=${Date.now()}`;
    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  const onOpenCloseConfirm = (): void =>
    setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await productCtrl.delete(product.prodID);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const openEditProduct = () => {
    setModalContent(
      <ProductForm
        onClose={closeModal}
        onReload={onReload}
        product={product}
      />,
    );
    setOpenModal(true);
  };

  const openEditImageProduct = () => {
    setModalContent(
      <ProductImageForm
        onClose={closeModal}
        onReload={onReload}
        productId={product.prodID}
      />,
    );
    setOpenModal(true);
  };

  return (
    <>
      <TableCell>{product.prodID}</TableCell>
      <TableCell>
        <Image
          src={image}
          alt={product.prodTitle}
          width={50}
          height={50}
          style={{ height: 50, width: "auto" }}
          loading="eager"
        />
      </TableCell>
      <TableCell>{product.prodTitle}</TableCell>
      <TableCell>S/ {product.prodPrice}</TableCell>
      <TableCell>
        {product.prodPriceBox ? `S/ ${product.prodPriceBox}` : "No aplica"}
      </TableCell>
      <TableCell>
        {product.prodUnitsPerBox ? product.prodUnitsPerBox : "No aplica"}
      </TableCell>
      <TableCell>
        {product.prodWholesaleMinQty
          ? product.prodWholesaleMinQty
          : "No aplica"}
      </TableCell>
      <TableCell>{fn.formatStockByPackaging(product)}</TableCell>
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
          <EditIcon onClick={openEditProduct} />
          <PhotoIcon onClick={openEditImageProduct} />
          <DeleteIcon onClick={onOpenCloseConfirm} />
        </Box>
      </TableCell>
      <ConfirmModal
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de eliminar el producto (${product.prodTitle})?`}
      ></ConfirmModal>
      <Modal
        show={openModal}
        onClose={closeModal}
        title={`Editar (${product.prodTitle})`}
      >
        {modalContent}
      </Modal>
    </>
  );
}
