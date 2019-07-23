const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withTM = require("next-transpile-modules");
const flow = require("lodash.flow");

module.exports = flow(
  withTM,
  withCSS,
  withImages
)({
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
  publicRuntimeConfig: {
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
    API_URL: process.env.API_URL || "http://127.0.0.1:4000"
  },
  transpileModules: [
    "color",
    "strict-uri-encode",
    "decode-uri-component",
    "query-string",
    "fuse.js"
  ]
});
