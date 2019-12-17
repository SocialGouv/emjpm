Given("a clean test database", async () => {
  // From "features/login.feature" {"line":8,"column":5}

  const { output } = require("codeceptjs");
  const { stdout } = await require("execa")(
    "pg_restore",
    [
      "--clean",
      "--host",
      "localhost",
      "--port",
      "5434",
      "--username",
      "postgres",
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
});
