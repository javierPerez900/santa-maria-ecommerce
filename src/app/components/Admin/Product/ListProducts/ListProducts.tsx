"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import { size, map } from "lodash";
import { Loading, NoResult, Pagination } from "@/app/components/Shared";
import { Product } from "./Product";
import { productCtrl } from "@/api";
import { Product as ProductType } from "@/interfaces/product";

const ITEMS_PER_PAGE = 10;

export function ListProducts({
  reload,
  onReload,
}: {
  reload: boolean;
  onReload: () => void;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const searchText = searchParams.get("searchAdmin") || "";

  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        setProducts(null);
        const response = await productCtrl.getAll(
          page,
          ITEMS_PER_PAGE,
          searchText,
        );
        setProducts(response.data || []);
        setTotalPages(Math.ceil(response.totalItems / ITEMS_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload, page, searchText]);

  if (!products) return <Loading text="Cargando productos" />;

  return (
    <Box>
      {size(products) === 0 ? (
        <NoResult text="No hay productos" />
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio\unidad</TableCell>
                  <TableCell>Precio\caja</TableCell>
                  <TableCell>Unidades\caja</TableCell>
                  <TableCell>Cantidad mínima x por mayor</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& tr:nth-of-type(odd)": { backgroundColor: "action.hover" },
                }}
              >
                {map(products, (product) => (
                  <TableRow key={product.prodID}>
                    <Product product={product} onReload={onReload} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      )}
    </Box>
  );
}
