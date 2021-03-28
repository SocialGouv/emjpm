const fetch = require("node-fetch");
const readline = require("readline");
const { Etablissements, RoutineLog } = require("~/models");
const logger = require("~/utils/logger");

const { acquireLock, releaseLock } = require("~/utils/pg-mutex-lock");

// const FILTERS = [
//   "355",
//   "292",
//   "106",
//   "362",
//   "412",
//   "444",
//   "697",
//   "252",
//   "253",
//   "255",
//   "370",
//   "382",
//   "395",
//   "437",
//   "448",
//   "246",
//   "379",
//   "445",
//   "446",
//   "202",
//   "500",
//   "501",
//   "502",
//   "381",
//   "214",
//   "219",
//   "380",
//   "165",
//   "101",
//   "340",
//   "460",
// ];

const actionsFinessImporter = {
  importFinessFile,
};

module.exports = actionsFinessImporter;

async function importFinessFile(url) {
  const lockKey = "import_finess";
  const lockAcquired = await acquireLock(lockKey, {
    timeout: 3600,
  });

  if (!lockAcquired) {
    logger.info(`FINESS import is already in progress!`);
    return;
  }

  const { id: logId } = await RoutineLog.query()
    .insert({
      start_date: new Date(),
      type: "import_finess",
    })
    .returning("id");

  let success;
  try {
    await runImport(url);
    success = true;
  } catch (e) {
    logger.error(e);
    success = false;
  }

  await RoutineLog.query()
    .findById(logId)
    .update({
      end_date: new Date(),
      result: success ? "success" : "error",
    });

  await releaseLock(lockKey);

  logger.info(`FINESS import is finished!`);
}

async function runImport(url) {
  const result = await fetch(url);

  const inputStream = result.body;
  inputStream.setEncoding("latin1");

  const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: inputStream,
  });

  let counter = 0;
  for await (const line of rl) {
    if (counter % 1000 == 0) {
      logger.info(`FINESS import in progress ${counter} lines processed`);
    }

    await importFinessFileLine(line);
    counter++;
  }
}

async function importFinessFileLine(line) {
  const [lineType, ...properties] = line.split(";");
  if (lineType === "structureet") {
    await importStructureEtablissement(properties);
  } else {
    await importGeolocalisation(properties);
  }
}

async function importGeolocalisation(properties) {
  const [nofinesset, coordxet, coordyet] = properties;
  const result = await Etablissements.query().findOne({ nofinesset });
  if (result && coordxet && coordyet) {
    await Etablissements.query()
      .update({
        coordxet,
        coordyet,
      })
      .where({ id: result.id });
  }
}

/*
  https://www.data.gouv.fr/fr/datasets/finess-extraction-du-fichier-des-etablissements/
  https://www.data.gouv.fr/fr/datasets/r/9b81484a-0deb-42f7-a7c4-eb9869ea580a
*/
const mapFinessColumns = {
  categagretab: 21,
  categetab: 19,
  codeape: 24,
  codemft: 25,
  codesph: 27,
  commune: 13,
  compldistrib: 7,
  complrs: 6,
  compvoie: 11,
  dateautor: 30,
  datemaj: 31,
  dateouv: 29,
  departement: 14,
  libcategagretab: 22,
  libcategetab: 20,
  libdepartement: 15,
  libmft: 26,
  libsph: 28,
  lieuditbp: 12,
  ligneacheminement: 16,
  nofinessej: 3,
  nofinesset: 2,
  numuai: 32,
  numvoie: 8,
  rs: 4,
  rslongue: 5,
  siret: 23,
  telecopie: 18,
  telephone: 17,
  typvoie: 9,
  voie: 10,
};

function mapFinessFromColumns(properties) {
  const m = {};
  for (const [key, index] of Object.entries(mapFinessColumns)) {
    m[key] = properties[index - 2];
  }
  return m;
}

async function importStructureEtablissement(properties) {
  const {
    categagretab,
    categetab,
    codeape,
    codemft,
    codesph,
    commune,
    compldistrib,
    complrs,
    compvoie,
    dateautor,
    dateouv,
    departement,
    libcategagretab,
    libcategetab,
    libdepartement,
    libmft,
    libsph,
    lieuditbp,
    ligneacheminement,
    nofinessej,
    nofinesset,
    numuai,
    numvoie,
    rs,
    rslongue,
    siret,
    telecopie,
    telephone,
    typvoie,
    voie,
  } = mapFinessFromColumns(properties);

  if (!departement) {
    return;
  }

  // if (!FILTERS.includes(categetab)) {
  //   return;
  // }

  const etablissement = {
    categagretab,
    categetab,
    codeape,
    codemft,
    codesph,
    commune,
    compldistrib,
    complrs,
    compvoie,
    dateautor,
    dateouv,
    departement_code: departement,
    libcategagretab,
    libcategetab,
    libdepartement,
    libmft,
    libsph,
    lieuditbp,
    ligneacheminement,
    nofinessej,
    nofinesset,
    numuai,
    numvoie,
    rs,
    rslongue: rslongue && rslongue != "" ? rslongue : rs,
    siret,
    telecopie,
    telephone,
    typvoie,
    voie,
  };

  await Etablissements.query()
    .insert(etablissement)
    .onConflict("nofinesset")
    .merge();
}
