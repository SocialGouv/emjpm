//

const { join } = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "emjpm",
      host: "db",
      password: "test",
      port: "5432",
      user: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5432",
      user: "emjpm",
    },
    migrations: {},
  },
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5432",
      user: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
};
