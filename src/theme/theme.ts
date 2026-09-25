"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#058488",
      dark: "#025e61",
      contrastText: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#888",
    },
    background: {
      default: "#fff",
      paper: "#f2f2f2",
    },
    success: {
      main: "#69af00",
    },
    warning: {
      main: "#ff6000",
    },
    error: {
      main: "#ff0a4e",
    },
    divider: "#cccccc",
  },
});

export default theme;
