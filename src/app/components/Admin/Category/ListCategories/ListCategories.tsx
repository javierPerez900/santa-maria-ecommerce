"use client";
import { useState, useEffect } from "react";
import { categoryCtrl } from "@/api";
import { Loading, NoResult } from "@/app/components/Shared";
import { size, map } from "lodash";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { Category } from "./Category";

interface Category {
  categID: number;
  categName: string;
  categPath: string;
}

export function ListCategories({
  reload,
  onReload,
}: {
  reload: boolean;
  onReload: () => void;
}) {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!categories) return <Loading text="Cargando categorias" />;

  return (
    <div>
      {size(categories) === 0 ? (
        <NoResult text="No hay categorías" />
      ) : (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& tr:nth-of-type(odd)": { backgroundColor: "action.hover" },
              }}
            >
              {map(categories, (category) => (
                <TableRow key={category.categID}>
                  <Category category={category} onReload={onReload} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
