const execa = require("execa");

async function cleanDatabase() {
  const { output } = require("codeceptjs");
  await execa(
    "psql",
    [
      "--host",
      "localhost",
      "--port",
      "5434",
      "--username",
      "postgres",
      "--dbname",
      "emjpm",
      "-e",
      "-f",
      require("path").join(process.cwd(), "./drop.sql")
    ],
    {
      env: {
        PGPASSWORD: "test"
      }
    }
  );
  const { stdout } = await execa(
    "pg_restore",
    [
      "--host",
      "localhost",
      "--port",
      "5434",
      "--username",
      "postgres",
      "-e",
      "--if-exists",
      "--clean",
      "--dbname",
      "emjpm",
      require("path").join(process.cwd(), "./test-seed.dump")
    ],
    {
      env: {
        PGPASSWORD: "test"
      }
    }
  );
  stdout && output.log("  #[" + stdout + "]");
}

Given("la base de donnée est initialisée", cleanDatabase)
Given("a clean test database", cleanDatabase);
