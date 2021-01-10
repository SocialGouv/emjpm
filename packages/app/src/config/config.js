const config = {
  API_URL: process.env.REACT_APP_API_URL || "http://127.0.0.1:4000",
  GRAPHQL_SERVER_URI:
    process.env.REACT_APP_GRAPHQL_SERVER_URI ||
    "http://localhost:5000/v1/graphql",
  NODE_ENV: process.env.NODE_ENV,
  PACKAGE_VERSION: process.env.REACT_APP_VERSION,
  SENTRY_PUBLIC_DSN: process.env.REACT_APP_SENTRY_PUBLIC_DSN,
};
export default config;
