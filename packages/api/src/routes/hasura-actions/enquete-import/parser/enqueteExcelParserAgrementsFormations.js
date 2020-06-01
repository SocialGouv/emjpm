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
  cnc_mjpm_heure_formation: schemaValidator.excelInteger(),
  niveau_qualification: schemaValidator
    .excelInteger()
    .min(1)
    .max(6),
  secretaire_specialise_etp_n1: schemaValidator.excelFloat().positive(),
  secretaire_specialise_etp_n2: schemaValidator.excelFloat().positive(),
  secretaire_specialise_etp_n3: schemaValidator.excelFloat().positive(),
  secretaire_specialise_etp_n4: schemaValidator.excelFloat().positive(),
  secretaire_specialise_etp_n5: schemaValidator.excelFloat().positive(),
  secretaire_specialise_etp_n6: schemaValidator.excelFloat().positive()
});

function parse(worksheet) {
  const rawData = {
    // agrements
    debut_activite_avant_2009: excelParser.rawValue(worksheet["C35"]),
    annee_agrement: excelParser.rawValue(worksheet["C37"]),
    nb_departements: excelParser.rawValue(worksheet["C39"]),
    nb_mesures_dep_finance: excelParser.rawValue(worksheet["C41"]),
    nb_mesures_dep_autres: excelParser.rawValue(worksheet["C43"]),
    // formation
    cnc_annee_obtention: excelParser.rawValue(worksheet["B47"]),
    cnc_heures_formation: excelParser.rawValue(worksheet["B48"]),
    niveau_qualification: parseNiveauQualification(worksheet),
    secretaire_specialise_etp_n1: excelParser.rawValue(worksheet["B53"]),
    secretaire_specialise_etp_n2: excelParser.rawValue(worksheet["C53"]),
    secretaire_specialise_etp_n3: excelParser.rawValue(worksheet["D53"]),
    secretaire_specialise_etp_n4: excelParser.rawValue(worksheet["E53"]),
    secretaire_specialise_etp_n5: excelParser.rawValue(worksheet["F53"]),
    secretaire_specialise_etp_n6: excelParser.rawValue(worksheet["G53"])
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
function parseNiveauQualification(worksheet) {
  return excelParser.rawValue(worksheet["B52"]) != null
    ? 1
    : excelParser.rawValue(worksheet["C52"]) != null
    ? 2
    : excelParser.rawValue(worksheet["D52"]) != null
    ? 3
    : excelParser.rawValue(worksheet["E52"]) != null
    ? 4
    : excelParser.rawValue(worksheet["F52"]) != null
    ? 5
    : excelParser.rawValue(worksheet["G52"]) != null
    ? 6
    : undefined;
}
