"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BasicLayout } from "../components/Layouts";
import { Separator } from "../components/Shared";
import { Container } from "@mui/material";
import { GridCategories } from "../components/GridCategories/GridCategories";
import { GridProducts } from "../components/GridProducts/GridProducts";
import { productCtrl } from "@/api";
import { Product as ProductType } from "@/interfaces/product";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(1, 100);
        setProducts(response.data || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (search) {
    return (
      <BasicLayout>
        <Container>
          <Separator height={20} />
        </Container>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <Separator height={50} />
      <Container>
        <GridCategories />

        <Separator height={50} />

        <h2>Últimos productos</h2>
        <Separator height={50} />
        <GridProducts
          products={products}
          columns={4}
          classProduct={{
            height: "100%",
            "& > a > div": {
              height: "100%",
              borderRadius: "5px",
              backgroundColor: "background.paper",
            },
          }}
        />
      </Container>
    </BasicLayout>
  );
}
