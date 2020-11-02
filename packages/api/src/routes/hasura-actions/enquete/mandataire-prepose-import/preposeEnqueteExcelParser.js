var XLSX = require("xlsx");
var {
  enqueteExcelParserAgrementsPopulations,
  enqueteExcelParserModalitesExercice,
  enqueteExcelParserPreposePersonnelFormation,
  enqueteExcelParserPreposePrestationsSociales,
  enqueteExcelParserFinancement,
  enqueteExcelParserActivite,
} = require("../common/excel-parser");

var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");

const parse = async ({ content }) => {
  const workbook = XLSX.read(content, {
    cellDates: true,
    dateNF: "dd/mm/yyyy",
    locale: "fr-FR",
    raw: false,
    type: "base64",
  });

  // vérification du nom des onglets
  checkRequiredTabs(workbook, [
    "page d'accueil",
    "modalites d'exercice",
    "Personnel et formation ", // espace final dans le nom de l'onglet
    // "activité 2018 et flux", // TODO réactiver ce check quand on aura fini les tests, car on utilise des jeux de données de l'an dernier avec l'onglet "activité 2017 et flux"
    "Populations ", // espace final dans le nom de l'onglet
    "Revenus- prestations sociales ", // espace final dans le nom de l'onglet
    "Financement",
    "Données à exporter",
  ]);

  const res = {
    activite: enqueteExcelParserActivite.parse(
      workbook.Sheets[workbook.SheetNames[3]]
    ),
    financement: enqueteExcelParserFinancement.parse(
      workbook.Sheets["Financement"]
    ),
    modaliteExercice: enqueteExcelParserModalitesExercice.parse(
      workbook.Sheets["modalites d'exercice"]
    ),
    populations: enqueteExcelParserAgrementsPopulations.parse(
      workbook.Sheets["Populations "]
    ),
    preposePersonnelFormation: enqueteExcelParserPreposePersonnelFormation.parse(
      workbook.Sheets["Personnel et formation "]
    ),
    prestationsSociales: enqueteExcelParserPreposePrestationsSociales.parse(
      workbook.Sheets["Revenus- prestations sociales "]
    ),
  };

  logger.info(
    "[IMPORT ENQUETE] parsed data:",
    JSON.stringify(res, undefined, 2)
  );
  return res;
};

function checkRequiredTabs(workbook, tabNames) {
  tabNames.forEach((tabName) => {
    if (!workbook.Sheets[tabName]) {
      logger.warn(
        `[IMPORT ENQUETE] Onglet "${tabName}" manquant - onglets présents: ${Object.keys(
          workbook.Sheets
        ).map((x) => `"${x}"`)}`
      );

      throw new HttpError(422, `Onglet "${tabName}" manquant`);
    }
  });
}

module.exports = {
  parse,
};
