import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/movie-explorer/", // penting utk path GitHub Pages
  build: {
    outDir: "docs", // build hasilnya ke folder docs
  },
});
