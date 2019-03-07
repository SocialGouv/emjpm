//

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
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds/test"
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
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds/development"
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
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds/production"
    }
  }
};
