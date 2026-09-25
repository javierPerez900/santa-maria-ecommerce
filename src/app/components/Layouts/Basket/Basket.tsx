"use client";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Badge } from "@mui/material";
import { useBasket } from "@/hooks/useBasket";

export function Basket() {
  const { total } = useBasket();

  return (
    <Box
      component={Link}
      href="/basket"
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        color: "text.primary",
      }}
    >
      <Badge
        badgeContent={total > 0 ? total : null}
        sx={{
          mr: "10px",
          "& .MuiBadge-badge": {
            backgroundColor: "#00BCD4",
            color: "white",
          },
        }}
      >
        <ShoppingCartIcon />
      </Badge>
      Mi cesta
    </Box>
  );
}
