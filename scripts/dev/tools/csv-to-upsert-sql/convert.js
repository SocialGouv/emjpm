#!/usr/bin/env node

const csv = require("csv-parser");
const fs = require("fs");

const [, , file] = process.argv;

const escape = (str) => str.replace(/'/g, "''");

const wrapValue = (value) => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }
  if (value == null || value === undefined) {
    return "NULL";
  }
  return `'${escape(value)}'`;
};

const communes = require("./correspondance-code-insee-code-postal.json");

const byInsee = communes.reduce((acc, { fields }) => {
  acc[fields.insee_com] = fields;
  return acc;
}, {});

const lines = [];
const sirets = new Set();
let missingSiretCount = 0;
let missingEtblCount = 0;
let missingInseeCount = 0;
fs.createReadStream(file)
  .pipe(csv())
  .on("data", (row) => {
    // console.log(row);
    const {
      LIBELLE_LONG_ES_FILS: etablissement,
      SIRET_FILS: siret,
      ADRESS_PRINCIPAL_FILS: adresse,
    } = row;

    if (!siret) {
      // console.error("missing siret", row)
      missingSiretCount++;
      return;
    }
    if (!etablissement) {
      // console.error("missing etablissement", row)
      missingEtblCount++;
      return;
    }
    if (sirets.has(siret)) {
      console.error("duplicate entry for siret", row);
      process.exit(1);
    }
    sirets.add(siret);

    let { COMMUNE_SIEGE_INSEE_FILS: insee } = row;
    insee = insee.padStart(5, "0");
    const inseeRow = byInsee[insee];

    if (!inseeRow) {
      // console.log("missing insee", insee, row)
      missingInseeCount++;
      return;
    }

    const {
      code_dept,
      nom_comm: ville,
      postal_code,
      geo_point_2d: [latitude, longitude],
    } = inseeRow;

    const code_postal = postal_code.split("/")[0];

    let departement_code = code_dept;
    if (departement_code === "97") {
      departement_code = inseeRow.insee_com.slice(0, 3);
    }

    const columnsData = {
      adresse,
      code_postal,
      departement_code,
      etablissement,
      immutable: true,
      latitude,
      longitude,
      siret,
      ville,
    };
    const columns = Object.keys(columnsData)
      .map((key) => `"${key}"`)
      .join(",");
    const values = Object.values(columnsData)
      .map((value) => wrapValue(value))
      .join(",");
    const sets = Object.entries(columnsData)
      .map(([key, value]) => `"${key}" = ${wrapValue(value)}`)
      .join(",");

    const sql = `INSERT INTO tis (${columns}) VALUES(${values}) ON CONFLICT (siret) DO UPDATE SET ${sets};`;
    lines.push(sql);
  })
  .on("end", () => {
    console.log("missing siret total:", missingSiretCount);
    console.log("missing etbl total:", missingEtblCount);
    console.log("missing insee total:", missingInseeCount);
    console.log("total entries:", lines.length);
    const sql = lines.join("\n");
    // console.log(sql)
    fs.writeFileSync("./migration.sql", sql);
  });
