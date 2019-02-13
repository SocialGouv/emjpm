module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  globals: {
    React: true,
    process: true,
    cy: true,
    describe: true,
    it: true,
    test: true,
    expect: true,
    before: true,
    beforeEach: true,
    Cypress: true
  },
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "warn",
    "no-unused-vars": "warn"
  }
};
