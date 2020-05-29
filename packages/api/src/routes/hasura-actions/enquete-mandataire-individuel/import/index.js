const {
  getEnqueteReponse,
  createEmptyEnqueteReponse
} = require("../../enquete-mandataire-individuel/requests");
const parser = require("./parser");
const logger = require("../../../../utils/logger");
const {
  saveInformationsMandataire,
  saveEnqueteReponsesAgrementsFormations,
  savePopulations,
  savePrestationsSociales
} = require("../../../../db/queries/enquete-reponses");

async function importEnqueteMandataireIndividuelFile({
  file: { content },
  // eslint-disable-next-line no-unused-vars
  importContext: { enqueteId, userId, service, mandataire }
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  const {
    informationsMandataire,
    populations,
    agrementsFormations,
    prestationsSociales
  } = await parser.parse({
    content
  });

  const enqueteReponse = await initEnqueteMandataireIndividuel({
    enqueteId,
    mandataireId: mandataire.id
  });

  // save data to database
  await saveInformationsMandataire(
    enqueteReponse.enquete_reponses_informations_mandataire_id,
    informationsMandataire
  );
  await saveEnqueteReponsesAgrementsFormations(
    enqueteReponse.enquete_reponses_agrements_formations_id,
    agrementsFormations
  );

  const populationsDb = await savePopulations(
    enqueteReponse.enquete_reponses_populations_id,
    populations
  );

  await savePrestationsSociales(
    enqueteReponse.enquete_reponses_prestations_sociale_id,
    prestationsSociales
  );

  logger.info(
    `[IMPORT ENQUETE] populationsDb: ${JSON.stringify(
      populationsDb,
      undefined,
      2
    )}`
  );

  const importSummary = {
    errors: [],
    create: [],
    update: []
  };

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);

  const errors = importSummary.errors;
  if (errors.length) {
    logger.info(
      `[IMPORT ENQUETE] ERROR (duration: ${durationInSeconds}s, errors: ${errors.length}, to create: ${importSummary.create.length}, to update:  ${importSummary.update.length})`
    );
  } else {
    logger.info(
      `[IMPORT ENQUETE] SUCCESS (duration: ${durationInSeconds}s, created: ${importSummary.create.length}, updated:  ${importSummary.update.length})`
    );
  }

  return {
    errors: importSummary.errors,
    creationNumber: importSummary.create.length,
    updateNumber: importSummary.update.length,
    invalidAntenneNames:
      importSummary.errors.length === 0 ? importSummary.invalidAntenneNames : []
  };
}

async function initEnqueteMandataireIndividuel({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId
    });
    enqueteReponse = insert_enquete_reponses_one;
  }
  return enqueteReponse;
}

module.exports = importEnqueteMandataireIndividuelFile;
