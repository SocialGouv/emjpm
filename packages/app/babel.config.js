module.exports = {
  ignore: ["dist"],
  plugins: [
    [
      "babel-plugin-styled-components",
      { displayName: true, preprocess: false, ssr: true },
    ],
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
  ],
  presets: [
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
};
