const pg = require("pg");
const parse = require("pg-connection-string").parse;

pg.defaults.ssl = true;

let poolMax = process.env.PG_POOL_MAX;
let poolMin = process.env.PG_POOL_MIN;
poolMax = poolMax ? parseInt(poolMax) : 5;
poolMin = poolMin ? parseInt(poolMin) : 5;

const pool = {
  max: poolMax,
  min: poolMin,
  propagateCreateError: false,
};

const { DATABASE_URL } = process.env;
const connection = DATABASE_URL
  ? {
      ...parse(DATABASE_URL),
      ssl: true,
    }
  : {
      database: "emjpm",
      host: "localhost",
      password: "test",
      port: "5434",
      user: "emjpm",
    };

console.log({ connection });

module.exports = {
  development: {
    client: "pg",
    connection: DATABASE_URL || {
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
