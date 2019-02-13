module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module"
    },
    plugins: ["prettier"],
    globals: {},
    rules: {
        "prettier/prettier": "error",
        "no-unused-vars": "warn"
    }
};
