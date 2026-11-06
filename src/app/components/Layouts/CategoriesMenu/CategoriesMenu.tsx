"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { map } from "lodash";
import Link from "next/link";
import { categoryCtrl } from "@/api";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

interface Category {
  categID: number;
  categName: string;
  categPath: string;
}

export function CategoriesMenu() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <Box
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 40,

        cursor: "grab",
        "&:active": {
          cursor: "grabbing",
        },

        "&::-webkit-scrollbar": {
          height: 4,
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.35),
          borderRadius: 2,
        },

        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.6),
        },
      }}
    >
      {map(categories, (category: Category) => (
        <Box
          key={category.categID}
          component={Link}
          href={`/categories/${category.categPath}`}
          sx={{
            pr: "50px",
            flexShrink: 0,
            color:
              pathname === `/categories/${category.categPath}`
                ? "primary.main"
                : "text.secondary",
            "&:hover": { color: "primary.main" },
            fontWeight:
              pathname === `/categories/${category.categPath}` ? 700 : "normal",
            textDecoration: "none",
          }}
        >
          {category.categName}
        </Box>
      ))}
    </Box>
  );
}
