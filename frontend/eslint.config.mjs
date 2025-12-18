import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
// AJOUT : pour les globals Jest
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  // AJOUT : config spécifique pour les tests Jest
  {
    files: ["src/**/*.test.js", "src/**/*.test.jsx"],
    languageOptions: {
      globals: {
        ...globals.jest,  // test, expect, describe, it, etc.
      },
    },
  },

  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["build/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        alert: "readonly",
        FormData: "readonly",
        fetch: "readonly",
      },
    },

    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11y,
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "jsx-a11y/alt-text": "warn",
    },

    settings: {
      react: { version: "detect" },
    },
  },
];
