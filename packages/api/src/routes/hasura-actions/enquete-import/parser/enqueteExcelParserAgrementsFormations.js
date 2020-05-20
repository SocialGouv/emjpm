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
  )
});

function parse(worksheet) {
  const rawData = {
    debut_activite_avant_2009: excelParser.rawValue(worksheet["AT4"]),
    annee_agrement: excelParser.rawValue(worksheet["AU"]),
    nb_departements: excelParser.rawValue(worksheet["AV4"])
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
