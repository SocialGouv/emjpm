module.exports = {
  testEnvironment: "./test/db/jest-environment-knex.js",
  testEnvironmentOptions: require("@socialgouv/api/knexfile.js").test,
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"]
};
