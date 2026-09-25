import { BasicLayout } from "@/app/components/Layouts";
import { Box, Container } from "@mui/material";
import { Separator } from "@/app/components/Shared";
import { productCtrl } from "@/api";
import { notFound } from "next/navigation";
import { ProductImage } from "@/app/components/Product/ProductImage";
import { Info } from "@/app/components/Product/Info";
import { Description } from "@/app/components/Product/Description";
import { Product as ProductType } from "@/interfaces/product";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const { search } = await searchParams;

  if (search) {
    return (
      <BasicLayout>
        <Container>
          <Separator height={20} />
        </Container>
      </BasicLayout>
    );
  }

  let product: ProductType;

  try {
    const response = await productCtrl.getBySlug(slug);
    product = response;
  } catch (error: unknown) {
    const err = error as { status?: number };

    if (err?.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <BasicLayout>
      <Container>
        <Box
          sx={{
            display: "flex",
            m: "0 -20px",
            "& > div": {
              width: "50%",
              p: "20px",
            },
          }}
        >
          <Box>
            <ProductImage
              productId={product.prodID}
              title={product.prodTitle}
            />
          </Box>
          <Box>
            <Info product={product} />
          </Box>
        </Box>
        <Separator height={20} />
        <Description product={product} />
      </Container>
      <Separator height={50} />
    </BasicLayout>
  );
}
