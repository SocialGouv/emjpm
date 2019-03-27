module.exports = {
  testEnvironment: "./__test__/db/jest-environment-knex.js",
  testEnvironmentOptions: require("@emjpm/knex/knexfile.js").test,
  roots: ["<rootDir>/__test__/"],
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"]
};
