const yup = require("yup");
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
  secretaire_specialise_etp: excelInteger(),
  local_professionnel: excelBoolean()
});

const agrementsFormationsSchema = yup.object().shape({
  debut_activite_avant_2009: excelBoolean(),
  annee_agrement: excelInteger()
    .min(2009)
    .max(2018),
  nb_departements: excelSelect(ENQ_REP_INFO_MANDATAIRE.NB_DEPARTEMENTS.byValue)
});

const enqueteExcelSchemas = {
  informationsGeneralesMandataireSchema,
  agrementsFormationsSchema
};

module.exports = {
  enqueteExcelSchemas
};

function excelSelect(map) {
  return yup.mixed().transform(x => map[x]);
}

function excelBoolean() {
  return yup.boolean().transform(x => !!(x & (x === "Oui")));
}

function excelInteger() {
  return yup
    .number()
    .transform(x => (x && !isNaN(parseInt(x)) ? parseInt(x) : undefined));
}
