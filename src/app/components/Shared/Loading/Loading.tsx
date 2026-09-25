import { CircularProgress, Box } from "@mui/material";
import { Separator } from "@/app/components/Shared";

interface LoadingProps {
  text?: string;
  top?: number;
}

export function Loading({ text = "Cargando", top = 0 }: LoadingProps) {
  return (
    <>
      <Separator height={top} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          color: "primary.text",
        }}
      >
        <CircularProgress sx={{ color: "primary.text" }} />
        <span>{text}</span>
      </Box>
    </>
  );
}
