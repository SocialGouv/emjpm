const fetch = require("node-fetch");
const readline = require("readline");
const { Etablissements } = require("~/models");
const { ProcessusStates } = require("~/models");
const { Departement } = require("~/models");
const logger = require("~/utils/logger");
const { findDepartementByCodeOrId } = require("@emjpm/biz");

const FILTERS = [
  "355",
  "292",
  "106",
  "362",
  "412",
  "444",
  "697",
  "252",
  "253",
  "255",
  "370",
  "382",
  "395",
  "437",
  "448",
  "246",
  "379",
  "445",
  "446",
  "202",
  "500",
  "501",
  "502",
  "381",
  "214",
  "219",
  "380",
  "165",
  "101",
];

const actionsFinessImporter = {
  importFinessFile,
};

module.exports = actionsFinessImporter;

async function completeImport() {
  await ProcessusStates.query().where({ id: "import_finess" }).update({
    end_date: new Date(),
  });
}

async function startImport() {
  let processusState = await ProcessusStates.query().findById("import_finess");
  if (!processusState) {
    processusState = await ProcessusStates.query().insertAndFetch({
      id: "import_finess",
    });
  }
  if (processusState.start_date && !processusState.end_date) {
    return false;
  }
  await ProcessusStates.query().where({ id: "import_finess" }).update({
    end_date: null,
    start_date: new Date(),
  });
  return true;
}

async function importFinessFile(url) {
  if (!startImport()) {
    logger.info(`FINESS import is already in progress!`);
    return;
  }

  const departements = await Departement.query();

  const result = await fetch(url);

  const inputStream = result.body;
  inputStream.setEncoding("latin1");

  const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: inputStream,
  });

  let counter = 0;
  for await (const line of rl) {
    if (counter % 100 == 0) {
      logger.info(`FINESS import in progress ${counter} lines processed`);
    }

    await importFinessFileLine(line, departements);
    counter++;
  }

  await completeImport();
  logger.info(`FINESS import is finished!`);
}

async function importFinessFileLine(line, departements) {
  const [lineType, ...properties] = line.split(";");
  if (lineType === "structureet") {
    await importStructureEtablissement(properties, departements);
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
  https://www.data.gouv.fr/fr/datasets/r/d1a2f35f-8823-400f-9296-6eb7361ddf6f
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

async function importStructureEtablissement(properties, departements) {
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

  if (!FILTERS.includes(categetab)) {
    return;
  }

  const { id: departementCode } = findDepartementByCodeOrId(departements, {
    code: departement,
  });

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
    departement_code: departementCode,
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

  const result = await Etablissements.query().findOne({ nofinesset });
  if (!result) {
    await Etablissements.query().insert(etablissement);
  } else {
    await Etablissements.query()
      .update({
        ...etablissement,
      })
      .where({ id: result.id });
  }
}
