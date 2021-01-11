module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier/react",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["prettier", "sort-keys-fix", "jsx-a11y", "react"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
