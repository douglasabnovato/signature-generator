/* Ponto de entrada: tema do Material UI e aplicação */
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { CODIGO_PORTFOLIO, deveMedir, loadMetrics } from "./utils/metrics";
import "./index.css";

/* O ButtonBase do MUI zera o outline; o contorno de foco do App.css (3 px, #1d4ed8) volta pelo tema, só no foco por teclado */
const theme = createTheme({
  palette: { primary: { main: "#1e40af" }, secondary: { main: "#9f1239" } },
  components: {
    MuiButtonBase: {
      styleOverrides: { root: { "&.Mui-focusVisible": { outline: "3px solid #1d4ed8", outlineOffset: "2px" } } },
    },
  },
});

if (deveMedir()) loadMetrics(import.meta.env.VITE_GOATCOUNTER_CODE || CODIGO_PORTFOLIO);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
/* Fim de main.tsx */
