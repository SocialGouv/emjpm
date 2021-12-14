let poolMax = process.env.PG_POOL_MAX;
let poolMin = process.env.PG_POOL_MIN;
poolMax = poolMax ? parseInt(poolMax) : 5;
poolMin = poolMin ? parseInt(poolMin) : 5;

const pool = {
  max: poolMax,
  min: poolMin,
  propagateCreateError: false,
};

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
    pool,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5434",
      user: "emjpm",
    },
    migrations: {},
    pool,
  },
  test: {
    // debug: true,
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5434",
      user: "emjpm",
    },
    migrations: {},
    pool: { acquireTimeoutMillis: 1000, max: 1, min: 1 },
  },
};
