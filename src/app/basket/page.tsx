"use client";
import { useState, useEffect } from "react";
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

export default function BasketPage() {
  const { basket } = useBasket();
  const [products, setProducts] = useState<BasketProduct[] | []>([]);
  const [address, setAddress] = useState<AddressType | null>(null);
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;

  useEffect(() => {
    (async () => {
      if (!basket) {
        setProducts([]);
        return;
      }
      try {
        const data = [];
        for await (const item of basket) {
          const response = await productCtrl.getById(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [basket]);
  return (
    <BasketLayout>
      {!products && currentStep !== 4 && <Loading />}

      {products && size(products) === 0 && currentStep < 4 && (
        <NoResult text="Carrito vacío" />
      )}
      {size(products) > 0 && currentStep === 1 && (
        <Box>
          <StepOne products={products} />
        </Box>
      )}
      {size(products) > 0 && currentStep === 2 && (
        <StepTwo
          products={products}
          address={address}
          setAddress={setAddress}
          nextDisabled={!address}
        />
      )}
      {size(products) > 0 && currentStep === 3 && address && (
        <StepThree products={products} address={address} />
      )}
      {currentStep === 4 && <StepFour />}
    </BasketLayout>
  );
}
