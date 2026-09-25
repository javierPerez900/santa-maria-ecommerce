"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { map, size } from "lodash";
import { Loading, NoResult } from "@/app/components/Shared";
import { Order } from "./Order";
import { orderCtrl } from "@/api";
import { OrderType } from "@/interfaces/order";

export function ListOrders() {
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll();
        setOrders(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) {
    return <Loading text="Cargando pedidos" top={100} />;
  }

  return (
    <Box>
      {size(orders) === 0 && <NoResult text="No tienes pedidos realizados" />}
      {map(orders, (order) => (
        <Order key={order.orderId} order={order} />
      ))}
    </Box>
  );
}
