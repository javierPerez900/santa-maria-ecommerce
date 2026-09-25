import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";

export function AdminButton() {
  return (
    <Box
      component={Link}
      href="/admin"
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        mr: "30px",
      }}
    >
      <SettingsIcon sx={{ fontSize: 24, mr: "10px" }} />
      Admin
    </Box>
  );
}
