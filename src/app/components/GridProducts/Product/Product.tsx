"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fn } from "@/utils/functions";
import { Box, Chip, SxProps } from "@mui/material";
import { Product as ProductType } from "@/interfaces/product";

const NOT_FOUND_IMG = "/images/not-found.jpg";

const PriceBox = ({
  label,
  chipColor,
  price,
  priceColor,
}: {
  label: string;
  chipColor: string;
  price: number;
  priceColor: string;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      "& > span": {
        fontWeight: "bold",
        fontSize: "18px",
        color: priceColor,
      },
    }}
  >
    <Chip
      label={label}
      size="small"
      sx={{
        py: 1.5,
        bgcolor: chipColor,
        color: "primary.contrastText",
        fontWeight: "bold",
        height: "12px",
      }}
    />{" "}
    <span>S/ {price}</span>
  </Box>
);

export function Product({
  product,
  classProduct,
  eager = false,
}: {
  product: ProductType;
  classProduct: SxProps;
  eager?: boolean;
}) {
  const [image, setImage] = useState(NOT_FOUND_IMG);

  const lowStock = product.prodStock > 0 && product.prodStock < 10;
  const sellOnlyUnit = product.prodSellOnlyUnit === 1;

  useEffect(() => {
    const imageUrl = `${fn.getUrlImage(product.prodID)}?v=${Date.now()}`;
    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  return (
    <Box sx={classProduct}>
      <Link href={`/product/${product.prodPath}`}>
        <Box
          sx={{
            p: "10px",
            "&:hover": {
              opacity: 0.7,
            },
            "& > h3": {
              color: "text.primary",
              fontSize: "16px",
              pt: "20px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
            "& > p": {
              color: "warning.main",
              fontSize: "12px",
              pt: "5px",
            },
          }}
        >
          <Image
            src={image}
            alt={product.prodTitle}
            width={400}
            height={400}
            loading={eager ? "eager" : "lazy"}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <h3>{product.prodTitle}</h3>
          <Box
            sx={{
              display: "flex",
              justifyContent: sellOnlyUnit ? "center" : "space-between",
              alignItems: "center",
              pt: "20px",
              flexWrap: "wrap",
              rowGap: "10px",
            }}
          >
            {!sellOnlyUnit && (
              <PriceBox
                label="Precio por caja"
                chipColor="secondary.main"
                price={product.prodPriceBox}
                priceColor="primary.main"
              />
            )}
            <PriceBox
              label="Precio por unidad"
              chipColor="secondary.dark"
              price={product.prodPrice}
              priceColor="primary.dark"
            />
            {!sellOnlyUnit && (
              <PriceBox
                label="Precio unitario al por mayor"
                chipColor="secondary.light"
                price={product.prodPriceWholesaleUnit}
                priceColor="primary.light"
              />
            )}
          </Box>
          {lowStock && <p>{`Solo quedan ${product.prodStock} unidades`}</p>}
        </Box>
      </Link>
    </Box>
  );
}
