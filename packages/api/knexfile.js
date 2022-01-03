const { parse } = require("pg-connection-string");

const { DATABASE_URL, PG_POOL_MAX, PG_POOL_MIN } = process.env;

const pool = {
  acquireTimeoutMillis: 2000,
  max: PG_POOL_MAX ? parseInt(PG_POOL_MAX) : 7,
  min: PG_POOL_MIN ? parseInt(PG_POOL_MIN) : 0,
  propagateCreateError: false,
};

const databaseConfig = DATABASE_URL
  ? parse(DATABASE_URL)
  : {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5434",
      user: "emjpm",
    };

const connection = {
  ...databaseConfig,
  ...(databaseConfig.ssl ? { ssl: { rejectUnauthorized: false } } : {}),
};

module.exports = {
  development: {
    client: "pg",
    connection,
    migrations: {},
    pool,
  },
  production: {
    client: "pg",
    connection,
    migrations: {},
    pool,
  },
  test: {
    // debug: true,
    client: "pg",
    connection,
    migrations: {},
    pool,
    // pool: { acquireTimeoutMillis: 1000, max: 1, min: 1 },
  },
};
