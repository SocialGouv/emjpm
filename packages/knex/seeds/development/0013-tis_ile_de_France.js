const fs = require("fs");

const data = fs.readFileSync(
  `${__dirname}/../../tis_Ile_de_France.csv`,
  "utf8"
);

const cols = ["etablissement", "code_postal", "ville", "telephone", "email"];

const splitRow = (row) =>
  row
    .split(";")
    .filter((r, i) => i < cols.length)
    .reduce((a, c, i) => ({ ...a, [cols[i]]: c }), {});

const rows = data.split("\n").filter(Boolean).map(splitRow);

exports.seed = (knex) => {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve();
  }
  return knex.batchInsert("tis", rows);
};
