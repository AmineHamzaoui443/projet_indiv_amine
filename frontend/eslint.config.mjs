import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["build/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    env: {
      browser: true,
      es2021: true
    },

    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11y
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "jsx-a11y/alt-text": "warn"
    },

    settings: {
      react: { version: "detect" }
    }
  }
];
