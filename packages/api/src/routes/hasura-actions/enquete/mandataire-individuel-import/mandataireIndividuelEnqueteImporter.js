const mandataireIndividuelEnqueteExcelParser = require("./mandataireIndividuelEnqueteExcelParser");
const logger = require("../../../../utils/logger");
const mandataireIndividuelEnqueteRepository = require("./mandataireIndividuelEnqueteRepository");

const mandataireIndividuelEnqueteImporter = {
  importEnqueteFile,
};

async function importEnqueteFile({
  file: { content },
  enqueteContext: { enqueteId, mandataireId },
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  // parse
  const tabs = await mandataireIndividuelEnqueteExcelParser.parse({
    content,
  });

  // save data to database
  await mandataireIndividuelEnqueteRepository.update(enqueteId, {
    isUpload: true,
    mandataireId,
    tabs,
  });

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);
  logger.info(`[IMPORT ENQUETE] SUCCESS (duration: ${durationInSeconds}s)`);
  return { errors: [] };
}

module.exports = mandataireIndividuelEnqueteImporter;
