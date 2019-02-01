module.exports = {
  test: {
    //debug: true,
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "test",
      port: "5434",
      database: "emjpm_test"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/test"
    }
  },
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "test",
      port: "5434",
      database: "emjpm_dev"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/development"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    }
  }
};
