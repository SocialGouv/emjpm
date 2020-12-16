const serviceEnqueteExcelParser = require("./serviceEnqueteExcelParser");
const logger = require("~/utils/logger");
const serviceEnqueteRepository = require("./serviceEnqueteRepository");

async function importEnqueteFile({
  file: { content },
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, userId, serviceId },
}) {
  const start = Date.now();
  logger.info(`[IMPORT ENQUETE] START ${enqueteId}`);

  // parse
  const tabs = await serviceEnqueteExcelParser.parse({
    content,
  });

  // save data to database
  await serviceEnqueteRepository.update(enqueteId, {
    isUpload: true,
    serviceId,
    tabs,
  });

  const durationInSeconds = Math.ceil((Date.now() - start) / 1000);
  logger.info(`[IMPORT ENQUETE] SUCCESS (duration: ${durationInSeconds}s)`);
  return { errors: [] };
}

module.exports = {
  importEnqueteFile,
};
