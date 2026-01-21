import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig({
  extends: [...nextVitals, ...nextTs],
  
  rules: {
    "@typescript-eslint/no-empty-object-type": "error",
  },
  // Override default ignores
  ignores: globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
});
