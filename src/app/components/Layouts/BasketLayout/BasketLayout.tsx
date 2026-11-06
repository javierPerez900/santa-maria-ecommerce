import { Separator } from "@/app/components/Shared";
import { HeaderBasket } from "@/app/components/Layouts/BasketLayout/HeaderBasket";
import { Box } from "@mui/material";

export function BasketLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ p: "10px 20px" }}>
      <HeaderBasket />
      <Separator height={100} />
      {children}
    </Box>
  );
}
