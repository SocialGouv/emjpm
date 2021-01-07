const config = {
  API_URL: process.env.API_URL || "http://127.0.0.1:4000",
  GRAPHQL_SERVER_URI:
    process.env.GRAPHQL_SERVER_URI || "http://localhost:5000/v1/graphql",
  NODE_ENV: process.env.NODE_ENV,
  PACKAGE_VERSION: process.env.VERSION || require("../../package.json").version,
  SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
};

export default config;
