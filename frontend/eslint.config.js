import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-console": "off"
    }
  }
];
