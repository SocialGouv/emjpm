const path = require('path')

module.exports = {
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL ||  {
      host: "localhost",
      user: "postgres",
      password: "test",
      port: "5434",
      database: "emjpm_test"
    },
    migrations: {
      directory: path.join(__dirname, "/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds/test")
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
      directory: path.join(__dirname, "/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds/development")
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
      directory: path.join(__dirname, "/db/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds/production")
    }
  }
};
