import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [

  js.configs.recommended,   // configuration ESLint officielle

  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["build/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true     // <-- active la syntaxe JSX
        }
      }
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
      react: {
        version: "detect"
      }
    }
  }
];
