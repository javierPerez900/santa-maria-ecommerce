"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fn } from "@/utils/functions";
import { Box, SxProps } from "@mui/material";
import { Product as ProductType } from "@/interfaces/product";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function Product({
  product,
  classProduct,
}: {
  product: ProductType;
  classProduct: SxProps;
}) {
  const [image, setImage] = useState(NOT_FOUND_IMG);
  const lowStock = product.prodStock > 0 && product.prodStock < 10;

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
              opacity: 0.6,
            },
            "& > h3": {
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
              justifyContent: "space-between",
              pt: "20px",
              "& > span": {
                fontWeight: "bold",
                fontSize: "20px",
                color: "primary.main",
              },
            }}
          >
            <span>S/{product.prodPrice}</span>
          </Box>
          {lowStock && <p>{`Solo quedan ${product.prodStock} unidades`}</p>}
        </Box>
      </Link>
    </Box>
  );
}
