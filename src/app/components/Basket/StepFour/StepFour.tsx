import { Container, Button } from "@mui/material";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function StepFour() {
  return (
    <Container
      sx={{
        display: "flex !important",
        flexDirection: "column",
        alignItems: "center",
        mt: "100px",
        "& > h2": {
          mb: "20px",
        },
      }}
    >
      <CheckCircleIcon sx={{ color: "success.main", fontSize: "70px" }} />
      <h2>!Compra exitosa</h2>
      <Button
        component={Link}
        href="/account"
        sx={{ color: "#f6f8f7", bgcolor: "#119c62", width: "300px" }}
      >
        Ver pedido
      </Button>
    </Container>
  );
}
