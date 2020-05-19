const enqueteExcelParser = require("./enqueteExcelParser");
const logger = require("../../../utils/logger");

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

  const enqueteToImport = enqueteExcelParser.parse({
    base64str
  });

  logger.info(`[IMPORT ENQUETE] enqueteToImport: ${enqueteToImport.length}`);

  const importSummary = {
    errors: [],
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

module.exports = actionsEnqueteImporter;
