module.exports = {
  testEnvironment: "./__test__/db/jest-environment-knex.js",
  testEnvironmentOptions: require("./knexfile.js").test,
  roots: ["<rootDir>/__test__/"],
  globalSetup: "./__test__/globalSetup.js",
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"]
};
