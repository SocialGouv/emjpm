module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "~": "./src",
          "~public": "./public",
        },
        root: ["."],
      },
    ],
    [
      "babel-plugin-styled-components",
      { displayName: true, preprocess: false, ssr: true },
    ],
    ["@babel/plugin-transform-runtime"],
  ],
  presets: [
    "@babel/preset-env",
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: ["last 5 Chrome version", "ie >= 11"],
          },
        },
      },
    ],
  ],
  sourceMaps: true,
};
