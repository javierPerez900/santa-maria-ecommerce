"use client";
import { useState, useEffect } from "react";
import { map } from "lodash";
import Link from "next/link";
import { categoryCtrl } from "@/api";
import { Box } from "@mui/material";

interface Category {
  categID: number;
  categName: string;
  categPath: string;
}

export function CategoriesMenu() {
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
  }, []);

  return (
    <Box
      sx={{
        overflowX: "scroll",
        whiteSpace: "nowrap",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 30,

        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none", // para Firefox
      }}
    >
      {map(categories, (category: Category) => (
        <Box
          key={category.categID}
          component={Link}
          href={`/categories/${category.categPath}`}
          sx={{ pr: "10px", color: "primary.main" }}
        >
          {category.categName}
        </Box>
      ))}
    </Box>
  );
}
