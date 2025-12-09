import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["build/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true // <-- Important pour parser le JSX
      }
    },
    plugins: {
      react,
      "jsx-a11y": jsxA11y
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/alt-text": "warn",
      "no-unused-vars": "warn"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
