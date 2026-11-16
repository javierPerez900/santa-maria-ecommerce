"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { map, size } from "lodash";
import { Loading, NoResult, Pagination } from "@/app/components/Shared";
import { Order } from "./Order";
import { orderCtrl } from "@/api";
import { OrderType } from "@/interfaces/order";

const ITEMS_PER_PAGE = 10;

interface OrdersData {
  page: number;
  orders: OrderType[];
  totalItems: number;
  error: boolean;
}

export function ListOrders() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const [data, setData] = useState<OrdersData | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await orderCtrl.getAll(page, ITEMS_PER_PAGE);
        if (cancelled) return;

        setData({
          page,
          orders: response.data || [],
          totalItems: response.totalItems || 0,
          error: false,
        });
      } catch (error) {
        console.error(error);
        if (cancelled) return;

        setData({ page, orders: [], totalItems: 0, error: true });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page]);

  if (!data || data.page !== page) {
    return <Loading text="Cargando pedidos" top={100} />;
  }

  const totalPages = Math.ceil(data.totalItems / ITEMS_PER_PAGE);

  return (
    <Box>
      {data.error && <NoResult text="No se pudieron cargar tus pedidos" />}
      {!data.error && size(data.orders) === 0 && (
        <NoResult text="No tienes pedidos realizados" />
      )}
      {map(data.orders, (order) => (
        <Order key={order.orderId} order={order} />
      ))}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </Box>
  );
}
