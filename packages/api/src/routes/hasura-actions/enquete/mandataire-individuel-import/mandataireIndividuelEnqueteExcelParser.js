var XLSX = require("xlsx");
var {
  enqueteExcelParserAgrementsFormations,
  enqueteExcelParserAgrementsPopulations,
  enqueteExcelParserInformationsMandataire,
  enqueteExcelParserPrestationsSociales,
  enqueteExcelParserActivite,
} = require("../common/excel-parser");

var HttpError = require("~/utils/error/HttpError");
const logger = require("~/utils/logger");

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
    "info mandataire-exerc. activité",
    // "activité 2018 et flux", // TODO réactiver ce check quand on aura fini les tests, car on utilise des jeux de données de l'an dernier avec l'onglet "activité 2017 et flux"
    "Populations ", // espace final dans le nom de l'onglet
    "Prestations sociales ", // espace final dans le nom de l'onglet
    "Données à exporter",
  ]);

  const res = {
    activite: enqueteExcelParserActivite.parse(
      workbook.Sheets[workbook.SheetNames[2]]
    ),
    agrementsFormations: enqueteExcelParserAgrementsFormations.parse(
      workbook.Sheets["info mandataire-exerc. activité"]
    ),
    informationsMandataire: enqueteExcelParserInformationsMandataire.parse(
      workbook.Sheets["info mandataire-exerc. activité"]
    ),
    populations: enqueteExcelParserAgrementsPopulations.parse(
      workbook.Sheets["Populations "]
    ),
    prestationsSociales: enqueteExcelParserPrestationsSociales.parse(
      workbook.Sheets["Prestations sociales "]
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

const mandataireIndividuelEnqueteExcelParser = {
  parse,
};

module.exports = mandataireIndividuelEnqueteExcelParser;
