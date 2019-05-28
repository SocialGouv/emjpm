const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withTM = require("next-plugin-transpile-modules");

/* eslint-disable no-console */
process.on("unhandledRejection", r => console.log(r));
/* eslint-enable no-console */

module.exports = withTM(
  withCSS(
    withImages({
      transpileModules: [
        "color",
        "strict-uri-encode",
        "decode-uri-component",
        "query-string",
        "fuse.js"
      ],
      webpack: config => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env));
        return config;
      },
      publicRuntimeConfig: {
        SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN || "https://sentry.dev",
        API_URL: process.env.API_URL || "http://127.0.0.1:4000"
      }
    })
  )
);

