var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");
const excelParser = require("./enqueteExcelParserUtil");

function parse(worksheet) {
  console.log('worksheet["G9"]', worksheet["G9"]);

  try {
    const rawData = {
      aah: excelParser.number(worksheet["D7"]),
      pch: excelParser.number(worksheet["D8"]),
      asi: excelParser.number(worksheet["D9"]),
      rsa: excelParser.number(worksheet["D10"]),
      als_apl: excelParser.number(worksheet["D11"]),
      aspa: excelParser.number(worksheet["D12"]),
      apa: excelParser.number(worksheet["D13"])
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
