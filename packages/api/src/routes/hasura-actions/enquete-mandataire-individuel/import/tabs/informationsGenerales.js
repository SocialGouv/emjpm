const yup = require("yup");

var HttpError = require("../../../../../utils/error/HttpError");
const logger = require("../../../../../utils/logger");
const { rawValue } = require("../../../../../utils/file/excelParser");
const {
  excelBoolean,
  excelSelect,
  excelFloat
} = require("../../../../../utils/file/excelValidations");
const { ENQ_REP_INFO_MANDATAIRE } = require("../constants");

const informationsGeneralesMandataireSchema = yup.object().shape({
  departement: yup.string(),
  region: yup.string(),
  nom: yup.string(),
  benevole: excelBoolean(),
  forme_juridique: excelSelect(ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byValue),
  sexe: excelSelect(ENQ_REP_INFO_MANDATAIRE.SEXE.byValue),
  anciennete: excelSelect(ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byValue),
  tranche_age: excelSelect(ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byValue),
  exerce_seul_activite: excelBoolean(),
  estimation_etp: excelSelect(ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byValue),
  exerce_secretaires_specialises: excelBoolean(),
  secretaire_specialise_etp: excelFloat(),
  local_professionnel: excelBoolean()
});

function parse(worksheet) {
  const rawData = {
    departement: rawValue(worksheet["B2"]),
    region: rawValue(worksheet["B3"]),
    nom: rawValue(worksheet["B4"]),
    benevole: rawValue(worksheet["B11"]),
    forme_juridique: rawValue(worksheet["B13"]),
    sexe: rawValue(worksheet["C15"]),
    anciennete: rawValue(worksheet["C17"]),
    tranche_age: rawValue(worksheet["C19"]),
    exerce_seul_activite: rawValue(worksheet["B23"]),
    estimation_etp: rawValue(worksheet["B25"]),
    exerce_secretaires_specialises: rawValue(worksheet["B27"]),
    secretaire_specialise_etp: rawValue(worksheet["D28"]),
    local_professionnel: rawValue(worksheet["D31"])
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
