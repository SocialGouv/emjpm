module.exports = {
  testEnvironment: "jest-environment-knex",
  testEnvironmentOptions: require("./knexfile.js").test,
  roots: ["<rootDir>/__test__/"],
};
