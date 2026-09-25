"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fn } from "@/utils/functions";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function ProductImage({
  productId,
  title,
}: {
  productId: number;
  title: string;
}) {
  const [image, setImage] = useState(NOT_FOUND_IMG);

  useEffect(() => {
    const imageUrl = `${fn.getUrlImage(productId)}?v=${Date.now()}`;
    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setImage(imageUrl);
    });
  }, [productId]);

  return (
    <Image
      src={image}
      alt={title}
      width={500}
      height={500}
      style={{
        width: "80%",
        height: "auto",
        margin: "0 auto",
      }}
    />
  );
}
