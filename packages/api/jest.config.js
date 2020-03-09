module.exports = {
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"],
  coverageDirectory: process.env.JEST_COVERAGE_DIRECTORY,
  roots: ["<rootDir>/__test__/"],
  testTimeout: 30000,
  testEnvironment: "jest-environment-knex",
  testEnvironmentOptions: require("@emjpm/knex/knexfile.js").test
};
