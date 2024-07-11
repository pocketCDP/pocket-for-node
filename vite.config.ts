/* eslint-disable @typescript-eslint/no-unsafe-call */
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    tsConfigPaths(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    css: false,
  },
});
