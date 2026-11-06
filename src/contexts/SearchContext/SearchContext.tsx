"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { Separator } from "@/app/components/Shared";
import { productCtrl } from "@/api";
import { GridProducts } from "@/app/components/GridProducts/GridProducts";
import { Product } from "@/interfaces/product";

const SEARCH_PAGE_SIZE = 100;

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [search]);

  useEffect(() => {
    if (!search) return;

    let cancelled = false;

    (async () => {
      try {
        setProducts(null);
        const response = await productCtrl.getAll(1, SEARCH_PAGE_SIZE, search);

        if (cancelled) return;

        setProducts(response.data || []);
        setTotalItems(response.totalItems || 0);
      } catch (error) {
        if (cancelled) return;
        console.error(error);
        setProducts([]);
        setTotalItems(0);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <>
      {children}
      {search && (
        <Box
          sx={{
            position: "absolute",
            top: "105px",
            left: 0,
            width: "100%",
            height: "calc(100% - 70px)",
            backgroundColor: "background.paper",
            p: "20px",
            overflowY: "scroll",
            zIndex: 1000,

            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>Buscando: {search}</p>
            <p>{totalItems} resultados</p>
          </Box>
          <Separator height={20} />
          <GridProducts
            products={products}
            columns={6}
            classProduct={{
              height: "100%",
              "& > a > div": {
                backgroundColor: "background.default",
                height: "100%",
                borderRadius: "5px",
              },
            }}
          />
        </Box>
      )}
    </>
  );
}
