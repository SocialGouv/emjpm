//

const { join } = require("path");

module.exports = {
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "hasura",
      password: "hasura",
      port: "5434",
      database: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "hasura",
      password: "hasura",
      port: "5434",
      database: "emjpm",
    },
    migrations: {},
    seeds: {},
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "hasura",
      password: "hasura",
      port: "5434",
      database: "emjpm",
    },
    migrations: {},
  },
};
