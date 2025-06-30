import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'import/order': ['warn', { 'groups': ['builtin', 'external', 'internal'], 'newlines-between': 'always' }],
      'unused-imports/no-unused-imports': 'warn',
    },
    plugins: [
      'import',
      'unused-imports',
    ],
  },
];

export default eslintConfig;
