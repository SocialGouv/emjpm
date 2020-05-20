var XLSX = require("xlsx");
var { enqueteExcelSchemas } = require("./enqueteExcelSchemas");
var HttpError = require("../../../utils/error/HttpError");
const logger = require("../../../utils/logger");

const parse = async ({ base64str }) => {
  const workbook = XLSX.read(base64str, {
    cellDates: true,
    dateNF: "dd/mm/yyyy",
    locale: "fr-FR",
    type: "base64",
    raw: false
  });

  // vérification du nom des onglets
  checkRequiredTabs(workbook, [
    "page d'accueil",
    "info mandataire-exerc. activité",
    // "activité 2018 et flux", // TODO réactiver ce check quand on aura fini les tests, car on utilise des jeux de données de l'an dernier avec l'onglet "activité 2017 et flux"
    "Populations ", // espace final dans le nom de l'onglet
    "Prestations sociales ", // espace final dans le nom de l'onglet
    "Données à exporter"
  ]);

  const worksheet = workbook.Sheets["Données à exporter"];

  const res = {
    informationsMandataire: parseInformationsMandataireData(worksheet)
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

function parseInformationsMandataireData(worksheet) {
  const rawData = {
    departement: rawValue(worksheet["A4"]),
    region: rawValue(worksheet["B4"]),
    nom: rawValue(worksheet["C4"]),
    benevole: rawValue(worksheet["D4"]),
    forme_juridique: rawValue(worksheet["E4"]),
    sexe: rawValue(worksheet["F4"]),
    anciennete: rawValue(worksheet["H4"]),
    tranche_age: rawValue(worksheet["J4"]),
    exerce_seul_activite: rawValue(worksheet["L4"]),
    estimation_etp: rawValue(worksheet["M4"]),
    exerce_secretaires_specialises: rawValue(worksheet["N4"]),
    secretaire_specialise_etp: rawValue(worksheet["N4"]),
    local_professionnel: rawValue(worksheet["O4"])
  };
  try {
    return enqueteExcelSchemas.informationsGeneralesMandataireSchema.validateSync(
      rawData
    );
  } catch (err) {
    logger.warn('[IMPORT ENQUETE] Données "informations mandataire" invalide');
    logger.err(err);
    throw new HttpError(422, 'Données "informations mandataire" invalide');
  }
}

function rawValue(cell) {
  if (cell) {
    return cell.v;
  }
  return undefined;
}

const enqueteExcelParser = {
  parse
};

module.exports = enqueteExcelParser;
