const pool = {
  max: 5,
  min: 5,
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
    pool,
  },
};
