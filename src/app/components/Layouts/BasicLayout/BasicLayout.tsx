"use client";
import { Container, Box } from "@mui/material";
import { Logo } from "@/app/components/Shared";
import { useAuth } from "@/hooks";
import { Search } from "@/app/components/Shared";
import {
  Basket,
  Account,
  AdminButton,
  CategoriesMenu,
} from "@/app/components/Layouts";

export function BasicLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  return (
    <>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Container
          sx={{
            display: "flex !important",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            "& > div": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <Box
            sx={{
              "& > a": {
                display: "block",
                width: "fit-content",
                mr: "20px",
              },
            }}
          >
            <Logo />
            <Search
              placeholder="Busca lo que necesitas..."
              sx={{
                width: "400px",
              }}
            />
          </Box>
          <Box>
            {isAdmin && <AdminButton />}
            <Account />
            <Basket />
          </Box>
        </Container>
      </Box>

      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Container>
          <CategoriesMenu />
        </Container>
      </Box>
      {children}
    </>
  );
}
