const fetch = require("node-fetch");
const readline = require("readline");
const { Etablissements } = require("../../../models/Etablissements");
const { Departement } = require("../../../models/Departement");
const logger = require("../../../utils/logger");

const actionsFinessImporter = {
  importFinessFile,
};

module.exports = actionsFinessImporter;

async function importFinessFile(url) {
  const departements = await Departement.query();

  const result = await fetch(url);

  const rl = readline.createInterface({
    input: result.body,
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
