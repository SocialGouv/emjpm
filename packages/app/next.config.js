const flow = require("lodash.flow");
const webpack = require("webpack");
const withImages = require("next-images");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

require("dotenv").config({ path: "../../.env" });

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withSourceMaps = require("@zeit/next-source-maps")({});

const withTranspileModule = require("next-transpile-modules")(["@emjpm/biz"]);

module.exports = flow(
  withTranspileModule,
  withImages,
  withBundleAnalyzer,
  withSourceMaps
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

    if (process.env.SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        new SentryWebpackPlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          include: "src",
          org: "incubateur",
          project: "emjpm",
          url: "https://sentry.fabrique.social.gouv.fr",
        })
      );
    }

    return config;
  },
});
