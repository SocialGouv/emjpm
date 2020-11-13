const fetch = require("node-fetch");
const readline = require("readline");
const { Etablissements } = require("../../../models/Etablissements");
const { ProcessusStates } = require("../../../models/ProcessusStates");
const { Departement } = require("../../../models/Departement");
const logger = require("../../../utils/logger");
const { findDepartementByCodeOrId } = require("@emjpm/core");

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
  if (result) {
    await Etablissements.query()
      .update({
        coordxet,
        coordyet,
      })
      .where({ id: result.id });
  }
}

async function importStructureEtablissement(properties, departements) {
  const [
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
  ] = properties;

  if (!FILTERS.includes(categetab)) {
    return;
  }

  const { id: departementId } = findDepartementByCodeOrId(departements, {
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
    departement_id: departementId,
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
