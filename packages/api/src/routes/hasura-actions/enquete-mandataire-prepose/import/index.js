const parser = require("./parser");

async function importEnqueteMandatairePreposeFile({
  file: { content }
  // importContext
}) {
  // const { enqueteId, userId, service, mandataire } = importContext;
  await parser.parse({ content });
}

module.exports = { importEnqueteMandatairePreposeFile };
