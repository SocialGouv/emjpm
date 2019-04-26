module.exports = {
  testEnvironment: "./jest-environment-knex.js",
  testEnvironmentOptions: require("./knexfile.js").test,
  roots: ["<rootDir>/__test__/"]
};
