const yup = require("yup");

var HttpError = require("../../../../../utils/error/HttpError");
const logger = require("../../../../../utils/logger");
const { rawValue } = require("../../../../../utils/file/excelParser");
const {
  excelFloat,
  excelInteger,
  excelBoolean,
  excelSelect
} = require("../../../../../utils/file/excelValidations");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../constants");

const agrementsFormationsSchema = yup.object().shape({
  debut_activite_avant_2009: excelBoolean(),
  annee_agrement: excelInteger()
    .min(2009)
    .max(2018),
  nb_departements: excelSelect(
    ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byValue
  ),
  nb_mesures_dep_finance: excelInteger(),
  nb_mesures_dep_autres: excelInteger(),
  cnc_mjpm_annee_obtention: excelInteger(),
  cnc_mjpm_heure_formation: excelInteger(),
  niveau_qualification: excelInteger()
    .min(1)
    .max(6),
  secretaire_specialise_etp_n1: excelFloat().min(0),
  secretaire_specialise_etp_n2: excelFloat().min(0),
  secretaire_specialise_etp_n3: excelFloat().min(0),
  secretaire_specialise_etp_n4: excelFloat().min(0),
  secretaire_specialise_etp_n5: excelFloat().min(0),
  secretaire_specialise_etp_n6: excelFloat().min(0)
});

function parse(worksheet) {
  const rawData = {
    // agrements
    debut_activite_avant_2009: rawValue(worksheet["C35"]),
    annee_agrement: rawValue(worksheet["C37"]),
    nb_departements: rawValue(worksheet["C39"]),
    nb_mesures_dep_finance: rawValue(worksheet["C41"]),
    nb_mesures_dep_autres: rawValue(worksheet["C43"]),
    // formation
    cnc_annee_obtention: rawValue(worksheet["B47"]),
    cnc_heures_formation: rawValue(worksheet["B48"]),
    niveau_qualification: parseNiveauQualification(worksheet),
    secretaire_specialise_etp_n1: rawValue(worksheet["B53"]),
    secretaire_specialise_etp_n2: rawValue(worksheet["C53"]),
    secretaire_specialise_etp_n3: rawValue(worksheet["D53"]),
    secretaire_specialise_etp_n4: rawValue(worksheet["E53"]),
    secretaire_specialise_etp_n5: rawValue(worksheet["F53"]),
    secretaire_specialise_etp_n6: rawValue(worksheet["G53"])
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
  return rawValue(worksheet["B52"]) != null
    ? 1
    : rawValue(worksheet["C52"]) != null
    ? 2
    : rawValue(worksheet["D52"]) != null
    ? 3
    : rawValue(worksheet["E52"]) != null
    ? 4
    : rawValue(worksheet["F52"]) != null
    ? 5
    : rawValue(worksheet["G52"]) != null
    ? 6
    : undefined;
}
