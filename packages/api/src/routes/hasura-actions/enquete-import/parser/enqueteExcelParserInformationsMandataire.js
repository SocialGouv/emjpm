var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");
const excelParser = require("./enqueteExcelParserUtil");
const schemaValidator = require("./enqueteExcelSchemaUtil");
const yup = require("yup");
const { ENQ_REP_INFO_MANDATAIRE } = require("../constants");

const informationsGeneralesMandataireSchema = yup.object().shape({
  departement: yup.string(),
  region: yup.string(),
  nom: yup.string(),
  benevole: schemaValidator.excelBoolean(),
  forme_juridique: schemaValidator.excelSelect(
    ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byValue
  ),
  sexe: schemaValidator.excelSelect(ENQ_REP_INFO_MANDATAIRE.SEXE.byValue),
  anciennete: schemaValidator.excelSelect(
    ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byValue
  ),
  tranche_age: schemaValidator.excelSelect(
    ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byValue
  ),
  exerce_seul_activite: schemaValidator.excelBoolean(),
  estimation_etp: schemaValidator.excelSelect(
    ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byValue
  ),
  exerce_secretaires_specialises: schemaValidator.excelBoolean(),
  secretaire_specialise_etp: schemaValidator.excelFloat(),
  local_professionnel: schemaValidator.excelBoolean()
});

function parse(worksheet) {
  const rawData = {
    departement: excelParser.rawValue(worksheet["B2"]),
    region: excelParser.rawValue(worksheet["B3"]),
    nom: excelParser.rawValue(worksheet["B4"]),
    benevole: excelParser.rawValue(worksheet["B11"]),
    forme_juridique: excelParser.rawValue(worksheet["B13"]),
    sexe: excelParser.rawValue(worksheet["C15"]),
    anciennete: excelParser.rawValue(worksheet["C17"]),
    tranche_age: excelParser.rawValue(worksheet["C19"]),
    exerce_seul_activite: excelParser.rawValue(worksheet["B23"]),
    estimation_etp: excelParser.rawValue(worksheet["B25"]),
    exerce_secretaires_specialises: excelParser.rawValue(worksheet["B27"]),
    secretaire_specialise_etp: excelParser.rawValue(worksheet["D28"]),
    local_professionnel: excelParser.rawValue(worksheet["D31"])
  };
  try {
    logger.warn(
      '[IMPORT ENQUETE] Données "informations mandataire" rawData:',
      rawData
    );

    return informationsGeneralesMandataireSchema.validateSync(rawData);
  } catch (err) {
    logger.warn('[IMPORT ENQUETE] Données "informations mandataire" invalide');
    logger.err(err);
    throw new HttpError(422, 'Données "informations mandataire" invalide');
  }
}

const enqueteExcelParserInformationsMandataire = {
  parse
};

module.exports = enqueteExcelParserInformationsMandataire;
