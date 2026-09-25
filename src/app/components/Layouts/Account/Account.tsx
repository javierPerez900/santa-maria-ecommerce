import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/hooks";
import { Box } from "@mui/material";

export function Account() {
  const { user } = useAuth();
  const url = user ? "/account" : "/join/login";

  return (
    <Box
      component={Link}
      href={url}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        mr: "30px",
      }}
    >
      <PersonIcon sx={{ fontSize: 24, mr: "10px" }} />
      {user?.userEmail ? `${user.userEmail.slice(0, 14)}...` : "Entrar"}
    </Box>
  );
}
