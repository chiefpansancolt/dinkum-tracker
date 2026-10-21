import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@/comps": path.resolve(__dirname, "src/components"),
      "@/playthrough": path.resolve(__dirname, "src/components/playthrough"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
