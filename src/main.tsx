/* Ponto de entrada: tema do Material UI e aplicação */
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { loadMetrics } from "./utils/metrics";
import "./index.css";

const theme = createTheme({ palette: { primary: { main: "#1e40af" }, secondary: { main: "#9f1239" } } });

loadMetrics();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
/* Fim de main.tsx */
