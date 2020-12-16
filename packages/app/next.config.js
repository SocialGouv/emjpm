const flow = require("lodash.flow");
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

require("dotenv").config({ path: "../../.env" });

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withSourceMaps = require("@zeit/next-source-maps")({
  devtool: "hidden-source-map",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = flow(
  withMDX,
  withCSS,
  withImages,
  withSourceMaps,
  withBundleAnalyzer
)({
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || "http://127.0.0.1:4000",
    GRAPHQL_SERVER_URI:
      process.env.GRAPHQL_SERVER_URI || "http://localhost:5000/v1/graphql",
    GRAPHQL_SERVER_URI_DOCKER:
      process.env.GRAPHQL_SERVER_URI_DOCKER ||
      process.env.GRAPHQL_SERVER_URI ||
      "http://localhost:5000/v1/graphql",
    NODE_ENV: process.env.NODE_ENV,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
});
