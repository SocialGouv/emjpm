import yup from "./yup";

export const enqueteMandataireIndividuelInformationsGeneralesSchema = yup.object().shape({
  anciennete: yup.string().nullable(),
  benevole: yup.boolean().nullable(),
  departement: yup.string().nullable(),
  estimation_etp: yup.string().nullable(),
  exerce_secretaires_specialises: yup.boolean().nullable(),
  forme_juridique: yup.string().nullable(),
  local_professionnel: yup.boolean().nullable(),
  nom: yup.string().nullable(),
  region: yup.string().nullable(),
  secretaire_specialise_etp: yup.number().nullable()
});

export const enqueteMandataireIndividuelAgrementsSchema = yup.object().shape({
  annee_agrement: yup
    .number()
    .min(1900)
    .nullable(),
  nb_departements: yup
    .number()
    .nullable()
    .positive()
    .integer()
});

export const enqueteMandataireIndividuelFormationSchema = yup.object().shape({
  cnc_dpf_annee_obtention: yup
    .number()
    .nullable()
    .positive()
    .integer(),
  cnc_maj_annee_obtention: yup
    .number()
    .nullable()
    .positive()
    .integer(),
  cnc_mjpm_annee_obtention: yup
    .number()
    .nullable()
    .positive()
    .integer(),
  cnc_mjpm_heure_formation: yup
    .number()
    .nullable()
    .positive()
    .integer(),
  niveau_qualification: yup
    .number()
    .nullable()
    .min(1)
    .max(5)
    .integer(),
  niveau_qualification_secretaire_spe: yup
    .number()
    .nullable()
    .min(1)
    .max(5)
    .integer()
});
