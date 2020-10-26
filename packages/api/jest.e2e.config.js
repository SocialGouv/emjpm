module.exports = {
  collectCoverageFrom: [
    "src/auth/**/*.js",
    "src/email/**/*.js",
    "src/routes/**/*.js",
  ],
  coverageDirectory: process.env.JEST_COVERAGE_DIRECTORY,
  roots: ["<rootDir>/__test__/"],
  testTimeout: 30000,
  testEnvironment: "jest-environment-knex",
  testEnvironmentOptions: require("./knexfile.js").test,
};
