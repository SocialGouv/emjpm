const yup = require("yup");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("./import/constants");

const informationsGeneralesMandataireSchema = yup.object().shape({
  nom: yup.string().required(),
  departement: yup.string().required(),
  region: yup.string().required(),
  benevole: yup.boolean().required(),
  forme_juridique: yup.string().when("benevole", {
    is: false,
    then: yup.string().required(),
    otherwise: yup.string().nullable()
  }),
  anciennete: yup.string().required(),
  estimation_etp: yup.string().required(),
  exerce_secretaires_specialises: yup.boolean().nullable(),
  secretaire_specialise_etp: yup.number().nullable(),
  local_professionnel: yup.boolean().required()
});

const informationsAgrementsMandataireSchema = yup.object().shape({
  annee_agrement: yup
    .number()
    .min(1900)
    .required(),
  nb_departements: yup
    .mixed()
    .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
    .required()
});

const informationsFormationMandataireSchema = yup.object().shape({
  cnc_mjpm_annee_obtention: yup
    .number()
    .required()
    .positive()
    .integer(),
  cnc_mjpm_heure_formation: yup
    .number()
    .required()
    .positive()
    .integer(),
  cnc_maj_annee_obtention: yup
    .number()
    .required()
    .positive()
    .integer(),
  cnc_dpf_annee_obtention: yup
    .number()
    .required()
    .positive()
    .integer(),
  niveau_qualification: yup
    .number()
    .required()
    .min(1)
    .max(5)
    .integer(),
  niveau_qualification_secretaire_spe: yup
    .number()
    .required()
    .min(1)
    .max(5)
    .integer()
});

// TODO
const activiteSchema = yup.object({});

// TODO
const prestationsSocialesSchema = yup.object({});

// TODO
const populationsSchema = yup.object({});

module.exports = {
  informationsGeneralesMandataireSchema,
  informationsAgrementsMandataireSchema,
  informationsFormationMandataireSchema,
  activiteSchema,
  prestationsSocialesSchema,
  populationsSchema
};
