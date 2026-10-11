import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Tip-Calculator/app/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@tip/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@tip/tokens": path.resolve(__dirname, "../../packages/tokens/src/index.ts"),
      "@tip/tokens/css": path.resolve(__dirname, "../../packages/tokens/src/tokens.css"),
    },
  },
});
