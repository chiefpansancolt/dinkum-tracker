import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@/service": path.resolve(import.meta.dirname, "src/lib/services"),
      "@/comps": path.resolve(import.meta.dirname, "src/components"),
      "@/playthrough": path.resolve(
        import.meta.dirname,
        "src/components/playthrough",
      ),
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
