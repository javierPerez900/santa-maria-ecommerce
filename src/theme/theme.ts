"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D4ED8",
      dark: "#2F3DB8",
      light: "#5B6CFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6E5AE8",
      dark: "#5846C7",
      light: "#8B7CF0",
      contrastText: "#fff",
    },
    text: {
      primary: "#1C2333",
      secondary: "#5C6578",
    },
    background: {
      default: "#E3EFF8",
      paper: "#FFFFFF",
    },
    success: {
      main: "#2F9E6B",
      contrastText: "#fff",
    },
    warning: {
      main: "#E07A2F",
      contrastText: "#fff",
    },
    error: {
      main: "#E11D48",
      contrastText: "#fff",
    },
    divider: "#C5D0DE",
    action: {
      hover: "rgba(61, 78, 216, 0.06)",
      selected: "rgba(61, 78, 216, 0.10)",
    },
  },
});

export default theme;
