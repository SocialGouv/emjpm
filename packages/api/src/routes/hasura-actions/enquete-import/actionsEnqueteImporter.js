const {
  getEnqueteReponse,
  createEmptyEnqueteReponse
} = require("../enquete-mandataire-individuel/requests");
const enqueteExcelParser = require("./enqueteExcelParser");
const logger = require("../../../utils/logger");
const enqueteImportRepository = require("./repository/enqueteImportRepository");

const actionsEnqueteImporter = {
  importEnqueteFile
};

async function importEnqueteFile({
  file: { base64str },
  importContext: {
    enqueteId,
    // mandataireUserId & serviceId are mutually exclusive
    mandataireUserId,
    serviceId
  }
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  const { informationsMandataire } = await enqueteExcelParser.parse({
    base64str
  });

  const enqueteReponse = await initEnqueteMandataireIndividuel({
    enqueteId,
    mandataireId: mandataireUserId
  });

  logger.info(
    `[IMPORT ENQUETE] enqueteReponse: ${JSON.stringify(
      enqueteReponse,
      undefined,
      2
    )}`
  );
  // save data to database
  const informationsMandataireDb = await enqueteImportRepository.saveInformationsMandataire(
    enqueteReponse.enquete_reponses_informations_mandataire_id,
    informationsMandataire
  );
  logger.info(
    `[IMPORT ENQUETE] informationsMandataireDb: ${JSON.stringify(
      informationsMandataireDb,
      undefined,
      2
    )}`
  );
  const importSummary = {
    errors: [],
    create: [],
    update: [],
    mandataireUserId,
    serviceId
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
module.exports = actionsEnqueteImporter;
