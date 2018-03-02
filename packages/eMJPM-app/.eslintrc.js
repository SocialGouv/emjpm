module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    parser: "babel-eslint",
    extends: ["plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module",
        prettierOptions: {
            printWidth: 100,
            tabWidth: 2
        }
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": "error"
    }
};
