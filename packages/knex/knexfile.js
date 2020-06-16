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
    migrations: {
      directory: join(__dirname, "migrations_v2"),
      tableName: "knex_migrations_v2",
    },
    seeds: {
      directory: join(__dirname, "seeds/development"),
    },
  },
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "emjpm",
      password: "test",
      port: "5434",
      database: "emjpm",
    },
    migrations: {
      directory: join(__dirname, "migrations_v2"),
      tableName: "knex_migrations_v2",
    },
    seeds: {
      directory: join(__dirname, "seeds/development"),
    },
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
    migrations: {
      directory: join(__dirname, "migrations_v2"),
      tableName: "knex_migrations_v2",
    },
  },
};
