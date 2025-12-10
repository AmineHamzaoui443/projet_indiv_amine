export default [
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
      browser: true,   // <-- AJOUT ESSENTIEL
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
