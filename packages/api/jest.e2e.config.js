module.exports = {
  collectCoverageFrom: [
    "src/auth/**/*.js",
    "src/email/**/*.js",
    "src/routes/**/*.js",
  ],
  coverageDirectory: process.env.JEST_COVERAGE_DIRECTORY,
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/__test__/"],
  testEnvironment: "jest-environment-knex",
  testEnvironmentOptions: require("./knexfile.js").test,
  testTimeout: 30000,
};
