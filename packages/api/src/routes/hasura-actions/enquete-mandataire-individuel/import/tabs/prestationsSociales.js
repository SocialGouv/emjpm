var HttpError = require("../../../../../utils/error/HttpError");
const logger = require("../../../../../utils/logger");
const { number } = require("../../../../../utils/file/excelParser");

function parse(worksheet) {
  console.log('worksheet["G9"]', worksheet["G9"]);

  try {
    const rawData = {
      aah: number(worksheet["D7"]),
      pch: number(worksheet["D8"]),
      asi: number(worksheet["D9"]),
      rsa: number(worksheet["D10"]),
      als_apl: number(worksheet["D11"]),
      aspa: number(worksheet["D12"]),
      apa: number(worksheet["D13"])
    };
    return rawData;
  } catch (err) {
    logger.warn('[IMPORT ENQUETE] Données "prestations sociales" invalide');
    logger.error(err);
    throw new HttpError(422, 'Données "prestations sociales" invalide');
  }
}

const enqueteExcelParserAgrementsFormations = {
  parse
};

module.exports = enqueteExcelParserAgrementsFormations;
