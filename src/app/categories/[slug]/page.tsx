import { Container } from "@mui/material";
import { size } from "lodash";
import { BasicLayout } from "@/app/components/Layouts";
import { GridProducts } from "@/app/components/GridProducts/GridProducts";
import { Pagination, Separator } from "@/app/components/Shared";
import { productCtrl } from "@/api";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 4;

interface CategoriesPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CategoriesPage({
  params,
  searchParams,
}: CategoriesPageProps) {
  const { slug } = await params;
  const { page: pageParam, search } = await searchParams;
  const page = Number(pageParam) || 1;

  if (search) {
    return (
      <BasicLayout>
        <Container>
          <Separator height={20} />
        </Container>
      </BasicLayout>
    );
  }
  let response, products, totalPages;

  try {
    response = await productCtrl.getByCategorySlug(slug, page, ITEMS_PER_PAGE);
    products = response.data || [];
    totalPages = Math.ceil(response.totalItems / ITEMS_PER_PAGE);
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
        <Separator height={20} />
        <GridProducts
          products={products}
          classProduct={{
            height: "100%",
            "& > a > div": {
              backgroundColor: "background.paper",
              height: "100%",
              borderRadius: "5px",
            },
          }}
        />
        {size(products) > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </Container>
    </BasicLayout>
  );
}
