module.exports = {
  testEnvironment: "jest-environment-knex",
  testEnvironmentOptions: require("@emjpm/knex/knexfile.js").test,
  roots: ["<rootDir>/__test__/"],
  collectCoverageFrom: ["auth/**/*.js", "email/**/*.js", "routes/**/*.js"]
};
