module.exports = {
  exclude: [],
  ignore: [
    "dist",
    (filename) => {
      if (!/\/node_modules\//.test(filename)) {
        return false; // if not in node_modules, we want to compile it
      } else if (/\/node_modules\/@emjpm\//.test(filename)) {
        // its our source code, so we want to compile it
        return false;
      }
      // it's in node modules and NOT our source code
      return true;
    },
  ],
  include: [/src/, /node_modules/],
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
            browsers: ["last 5 Chrome version", "ie >= 11", "firefox >= 52"],
          },
        },
      },
    ],
  ],
  sourceMaps: "both",
};
