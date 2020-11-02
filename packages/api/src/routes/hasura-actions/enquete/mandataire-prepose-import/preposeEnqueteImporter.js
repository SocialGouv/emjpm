const preposeEnqueteExcelParser = require("./preposeEnqueteExcelParser");
const logger = require("../../../../utils/logger");
const preposeEnqueteRepository = require("./preposeEnqueteRepository");

const preposeEnqueteImporter = {
  importEnqueteFile,
};

async function importEnqueteFile({
  file: { content },
  enqueteContext: { enqueteId, mandataireId },
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  // parse
  const tabs = await preposeEnqueteExcelParser.parse({
    content,
  });

  // save data to database
  await preposeEnqueteRepository.update(enqueteId, {
    isUpload: true,
    mandataireId,
    tabs,
  });

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);
  logger.info(`[IMPORT ENQUETE] SUCCESS (duration: ${durationInSeconds}s)`);
  return { errors: [] };
}

module.exports = preposeEnqueteImporter;
