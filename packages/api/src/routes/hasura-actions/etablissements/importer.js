const { MESURE_PROTECTION, MESURE_PROTECTION_STATUS } = require("@emjpm/core");
const excelParser = require("../../../../utils/file/excelParser");
const logger = require("../../../../utils/logger");

async function importFinessFile({
  file: { content, type },
  importContext: { mandataireUserId, serviceId },
  antennesMap,
}) {
  const start = Date.now();
  logger.info(`[IMPORT MESURES] START`);

  const mesuresToImport = excelParser.parseSheetByIndex({
    sheetIndex: 0,
    content,
    parseOptions: {
      cellDates: true,
      dateNF: "dd/mm/yyyy",
      locale: "fr-FR",
      type: type === "csv" ? "string" : "base64",
      raw: type === "csv" ? true : false,
    },
  });
}

module.exports = { importFinessFile };
