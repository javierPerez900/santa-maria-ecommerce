import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DateTime } from "luxon";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BasicModal from "@/app/components/Modal/BasicModal";
import { ProductsDetails } from "../ProductsDetails";
import { AddressDetails } from "../AddressDetails";
import { OrderType } from "@/interfaces/order";

export function Order({ order }: { order: OrderType }) {
  const createdAt = new Date(order.orderDate).toISOString();
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "10px",
          mb: "10px",
          backgroundColor: "background.paper",
          "& > div > span": {
            color: "text.secondary",
            fontSize: "12px",
          },
        }}
      >
        <Box>
          <p>Número de pedido: {order.orderId}</p>

          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy",
            )}
          </span>
        </Box>
        <Button onClick={onOpenCloseModal}>
          <RemoveRedEyeIcon />
        </Button>
      </Box>
      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Detalles del pedido"
      >
        <ProductsDetails productsOrder={order.OrderDetails} />
        <AddressDetails addressId={order.orderAddId} />
        <p
          style={{
            marginTop: "20px",
            textAlign: "right",
            color: "primary.main",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          S/ {order.orderTotal}
        </p>
      </BasicModal>
    </>
  );
}
