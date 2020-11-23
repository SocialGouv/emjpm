const execa = require("execa");
const { Soit } = require("./_fr");

Soit("une nouvelle base de donnée", async () => {
  const { output } = require("codeceptjs");
  const { seedData } = require("@emjpm/database/seed-data.js");
  const { stdout } = await seedData("emjpm");
  stdout && output.log("  #[" + stdout + "]");
});
