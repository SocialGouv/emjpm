var XLSX = require("xlsx");

var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");
const parserModaliteExercice = require("./tabs/modaliteExercice");

const parse = async ({ content }) => {
  const workbook = XLSX.read(content, {
    cellDates: true,
    dateNF: "dd/mm/yyyy",
    locale: "fr-FR",
    type: "base64",
    raw: false
  });

  // vérification du nom des onglets
  checkRequiredTabs(workbook, ["modalites d'exercice"]);

  const res = {
    modaliteExercice: parserModaliteExercice.parse(
      workbook.Sheets["modalites d'exercice"]
    )
  };

  logger.info(
    "[IMPORT ENQUETE] parsed data:",
    JSON.stringify(res, undefined, 2)
  );
  return res;
};

function checkRequiredTabs(workbook, tabNames) {
  tabNames.forEach(tabName => {
    if (!workbook.Sheets[tabName]) {
      logger.warn(
        `[IMPORT ENQUETE] Onglet "${tabName}" manquant - onglets présents: ${Object.keys(
          workbook.Sheets
        ).map(x => `"${x}"`)}`
      );

      throw new HttpError(422, `Onglet "${tabName}" manquant`);
    }
  });
}

const enqueteMandatairePreposeExcelParser = {
  parse
};

module.exports = enqueteMandatairePreposeExcelParser;
