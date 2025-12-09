import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/movie-explorer/", // penting untuk GitHub Pages
  build: {
    outDir: "docs", // hasil build masuk ke folder docs
  },
});
