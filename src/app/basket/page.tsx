"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { size } from "lodash";
import { BasketLayout } from "@/app/components/Layouts/BasketLayout/BasketLayout";
import { NoResult, Loading } from "@/app/components/Shared";
import { StepOne, StepTwo, StepThree, StepFour } from "@/app/components/Basket";
import { productCtrl } from "@/api";
import { useBasket } from "@/hooks";
import { BasketProduct } from "@/interfaces/product";
import { AddressType } from "@/interfaces/address";

type ProductDetail = Omit<BasketProduct, "quantity">;

export default function BasketPage() {
  const { basket } = useBasket();

  // Datos de producto ya consultados a la API (null = no existe o falló)
  const [details, setDetails] = useState<Record<number, ProductDetail | null>>(
    {},
  );

  const [address, setAddress] = useState<AddressType | null>(null);

  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;

  // Ids que aún no se han consultado. Cambia solo cuando entra un producto
  // nuevo al carrito, nunca por un cambio de cantidad.
  const missingKey = useMemo(() => {
    if (!basket) return "";

    return basket
      .map((item: { id: number; quantity: number }) => item.id)
      .filter((id: number) => !(id in details))
      .join(",");
  }, [basket, details]);

  useEffect(() => {
    if (!missingKey) return;

    const missingIds = missingKey.split(",").map(Number);
    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missingIds.map(async (id) => {
          try {
            const detail = await productCtrl.getById(id);
            return [id, detail ?? null] as const;
          } catch (error) {
            console.error(error);
            return [id, null] as const;
          }
        }),
      );

      if (cancelled) return;

      setDetails((prev) => {
        const next = { ...prev };
        entries.forEach(([id, detail]) => {
          next[id] = detail;
        });
        return next;
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [missingKey]);

  // Datos en caché + cantidades actuales del carrito: se calcula al instante
  const products = useMemo<BasketProduct[]>(() => {
    if (!basket) return [];

    return basket.flatMap((item: { id: number; quantity: number }) => {
      const detail = details[item.id];
      return detail ? [{ ...detail, quantity: item.quantity }] : [];
    });
  }, [basket, details]);

  // true mientras el carrito no ha cargado o faltan productos por consultar.
  // No se activa al cambiar cantidades, porque ahí missingKey no cambia.
  const isLoading = basket === null || missingKey !== "";

  return (
    <BasketLayout>
      {isLoading && currentStep !== 4 && <Loading />}

      {!isLoading && size(products) === 0 && currentStep < 4 && (
        <NoResult text="Carrito vacío" />
      )}
      {!isLoading && size(products) > 0 && currentStep === 1 && (
        <Box>
          <StepOne products={products} />
        </Box>
      )}
      {!isLoading && size(products) > 0 && currentStep === 2 && (
        <StepTwo
          products={products}
          address={address}
          setAddress={setAddress}
          nextDisabled={!address}
        />
      )}
      {!isLoading && size(products) > 0 && currentStep === 3 && address && (
        <StepThree products={products} address={address} />
      )}
      {currentStep === 4 && <StepFour />}
    </BasketLayout>
  );
}
