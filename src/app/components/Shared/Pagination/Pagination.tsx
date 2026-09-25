"use client";
import { Container, Pagination as PaginationMUI } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: "20px",
      }}
    >
      <PaginationMUI
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}
