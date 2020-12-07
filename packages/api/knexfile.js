//

const { join } = require("path");

module.exports = {
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "emjpm",
      password: "test",
      port: "5434",
      database: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "db",
      user: "emjpm",
      password: "test",
      port: "5432",
      database: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "emjpm",
      password: "test",
      port: "5434",
      database: "emjpm",
    },
    migrations: {},
  },
};
