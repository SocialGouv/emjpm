module.exports = {
  testEnvironment: "@emjpm/knex/jest-environment-knex.js",
  testEnvironmentOptions: require("@emjpm/knex/knexfile.js").test,
  roots: ["<rootDir>/__test__/"],
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"]
};
