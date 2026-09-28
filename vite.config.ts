/* Build com Vite (substitui react-scripts 4) com caminho relativo para o GitHub Pages; testes com Vitest */
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "build" },
  test: { environment: "jsdom" },
});
/* Fim de vite.config.ts */
