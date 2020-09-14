const fetch = require("node-fetch");
const readline = require("readline");
const { Etablissements } = require("../../../models/Etablissements");
const { ProcessusStates } = require("../../../models/ProcessusStates");
const { Departement } = require("../../../models/Departement");
const logger = require("../../../utils/logger");

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
    start_date: new Date(),
    end_date: null,
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
    input: inputStream,
    crlfDelay: Infinity,
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
    nofinesset,
    nofinessej,
    rs,
    rslongue,
    complrs,
    compldistrib,
    numvoie,
    typvoie,
    voie,
    compvoie,
    lieuditbp,
    commune,
    departement,
    libdepartement,
    ligneacheminement,
    telephone,
    telecopie,
    categetab,
    libcategetab,
    categagretab,
    libcategagretab,
    siret,
    codeape,
    codemft,
    libmft,
    codesph,
    libsph,
    dateouv,
    dateautor,
    numuai,
  ] = properties;

  const { id: departementId } = departements.find(
    (elm) => elm.code === departement
  );

  const etablissement = {
    nofinesset,
    nofinessej,
    rs,
    rslongue,
    complrs,
    compldistrib,
    numvoie,
    typvoie,
    voie,
    compvoie,
    lieuditbp,
    commune,
    departement_id: departementId,
    libdepartement,
    ligneacheminement,
    telephone,
    telecopie,
    categetab,
    libcategetab,
    categagretab,
    libcategagretab,
    siret,
    codeape,
    codemft,
    libmft,
    codesph,
    libsph,
    dateouv,
    dateautor,
    numuai,
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
