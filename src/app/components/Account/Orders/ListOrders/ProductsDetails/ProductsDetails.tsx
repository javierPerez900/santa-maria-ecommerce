import { useState, useEffect } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { map } from "lodash";
import { Loading } from "@/app/components/Shared";
import { productCtrl } from "@/api";
import { fn } from "@/utils/functions";
import { OrderDetailsType } from "@/interfaces/order";
import { Product } from "@/interfaces/product";

interface ProductsDetailsType extends Product {
  quantity: number;
}

export function ProductsDetails({
  productsOrder,
}: {
  productsOrder: OrderDetailsType[];
}) {
  const [products, setProducts] = useState<ProductsDetailsType[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productsTemp = [];
        for await (const item of productsOrder) {
          const response = await productCtrl.getById(item.odProdId);
          productsTemp.push({ ...response, quantity: item.odQuantity });
        }
        setProducts(productsTemp);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [productsOrder]);

  if (loading) return <Loading text="Cargando productos" />;

  return (
    <Box>
      {map(products, (product) => (
        <Box
          key={product.prodID}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderBottomColor: "divider",
            p: "15px 10px",
            "&:last-of-type": {
              border: 0,
              pb: 0,
            },
            "& > div": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <Box>
            <Image
              src={fn.getUrlImage(product.prodID)}
              alt={product.prodTitle}
              width={70}
              height={70}
              style={{
                marginRight: "20px",
              }}
            />
            <Box>
              <h4>{product.prodTitle}</h4>
            </Box>
          </Box>
          <p style={{ width: "200px", textAlign: "right" }}>
            {product.quantity} x S/ {product.prodPrice}
          </p>
        </Box>
      ))}
    </Box>
  );
}
