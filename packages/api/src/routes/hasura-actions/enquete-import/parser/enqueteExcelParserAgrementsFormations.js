var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");
const excelParser = require("./enqueteExcelParserUtil");
const schemaValidator = require("./enqueteExcelSchemaUtil");
const yup = require("yup");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../constants");

const agrementsFormationsSchema = yup.object().shape({
  debut_activite_avant_2009: schemaValidator.excelBoolean(),
  annee_agrement: schemaValidator
    .excelInteger()
    .min(2009)
    .max(2018),
  nb_departements: schemaValidator.excelSelect(
    ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byValue
  ),
  nb_mesures_dep_finance: schemaValidator.excelInteger(),
  nb_mesures_dep_autres: schemaValidator.excelInteger(),
  cnc_mjpm_annee_obtention: schemaValidator.excelInteger(),
  cnc_mjpm_heure_formation: schemaValidator.excelInteger()
});

function parse(worksheet) {
  const rawData = {
    debut_activite_avant_2009: excelParser.rawValue(worksheet["C35"]),
    annee_agrement: excelParser.rawValue(worksheet["C37"]),
    nb_departements: excelParser.rawValue(worksheet["C39"]),
    nb_mesures_dep_finance: excelParser.rawValue(worksheet["C41"]),
    nb_mesures_dep_autres: excelParser.rawValue(worksheet["C43"]),
    cnc_mjpm_annee_obtention: excelParser.rawValue(worksheet["B47"]),
    cnc_mjpm_heure_formation: excelParser.rawValue(worksheet["B48"])
  };
  try {
    return agrementsFormationsSchema.validateSync(rawData);
  } catch (err) {
    logger.warn('[IMPORT ENQUETE] Données "agrements formations" invalide');
    logger.err(err);
    throw new HttpError(422, 'Données "agrements formations" invalide');
  }
}

const enqueteExcelParserAgrementsFormations = {
  parse
};

module.exports = enqueteExcelParserAgrementsFormations;
