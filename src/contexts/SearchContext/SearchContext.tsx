"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { Separator } from "@/app/components/Shared";
import { productCtrl } from "@/api";
import { GridProducts } from "@/app/components/GridProducts/GridProducts";
import { Product } from "@/interfaces/product";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (searchParams.get("search")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchParams.get("search")]);

  useEffect(() => {
    (async () => {
      try {
        setProducts(null);
        const response = await productCtrl.getAll(
          1,
          100000,
          searchParams.get("search") || "",
        );
        setProducts(response.data || []);
        setTotalItems(response.totalItems || 0);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchParams.get("search")]);

  return (
    <>
      {children}
      {searchParams.get("search") && (
        <Box
          sx={{
            position: "absolute",
            top: "70px",
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
            <p>Buscando: {searchParams.get("search")}</p>
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
