import { parse } from "./parser";

async function importEnqueteMandatairePreposeFile({
  file: { content }
  // importContext
}) {
  // const { enqueteId, userId, service, mandataire } = importContext;
  await parse({ content });
}

module.exports = { importEnqueteMandatairePreposeFile };
