module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier/react",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: [
    "prettier",
    "sort-keys-fix",
    "simple-import-sort",
    "jsx-a11y",
    "react",
  ],
  rules: {
    camelcase: "off",
    "dot-notation": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",

    "import/order": "off",

    "no-template-curly-in-string": "off",

    "no-unneeded-ternary": "off",

    "node/no-callback-literal": "off",

    "one-var": "off",

    "prefer-const": "error",
    // "prettier/prettier": ["error", { semi: false }],
    // quotes: ["error", "double"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "simple-import-sort/sort": "off",
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-keys-fix/sort-keys-fix": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
