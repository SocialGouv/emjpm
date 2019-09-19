//

const { join } = require("path");

module.exports = {
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "postgres",
      password: "test",
      port: "5434",
      database: "emjpm_test"
    },
    migrations: {
      directory: join(__dirname, "migrations")
    },
    seeds: {
      directory: join(__dirname, "seeds/development")
    }
  },
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "api",
      password: "test",
      port: "5434",
      database: "emjpm_dev"
    },
    migrations: {
      directory: join(__dirname, "migrations")
    },
    seeds: {
      directory: join(__dirname, "seeds/development")
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      host: "localhost",
      user: "postgres",
      password: "test",
      port: "5434",
      database: "emjpm_prod"
    },
    migrations: {
      directory: join(__dirname, "migrations")
    }
  }
};
