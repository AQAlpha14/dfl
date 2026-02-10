import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig({
  extends: [...nextVitals, ...nextTs],
  ...compat.extends("next/core-web-vitals"),

  rules: {
    "@typescript-eslint/no-empty-object-type": "error",
  },
  // Override default ignores
  ignores: globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
});
