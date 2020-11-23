const execa = require("execa");

const seedData = (databaseName) => {
  return execa(
    "pg_restore",
    [
      "--host",
      "localhost",
      "--port",
      "5434",
      "--username",
      "emjpm",
      "-e",
      "--if-exists",
      "--clean",
      "--dbname",
      `${databaseName}`,
      require("path").join(__dirname, "./test-seed.dump"),
    ],
    {
      env: {
        PGPASSWORD: "test",
      },
    }
  );
};

module.exports = { seedData };
