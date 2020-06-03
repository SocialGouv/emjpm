import yup from "./yup";

export const enqueteMandataireIndividuelInformationsGeneralesSchema = yup.object().shape({
  anciennete: yup.string().nullable(),
  benevole: yup.boolean().nullable(),
  departement: yup.string().required(),
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
  debut_activite_avant_2009: yup.boolean().nullable(),
  nb_departements: yup.string().nullable()
});

export const enqueteMandataireIndividuelFormationSchema = yup.object().shape({
  cnc_annee_obtention: yup
    .number()
    .nullable()
    .positive()
    .integer(),
  cnc_heures_formation: yup
    .number()
    .nullable()
    .positive(),
  niveau_qualification: yup
    .number()
    .nullable()
    .min(1)
    .max(5)
    .integer(),
  secretaire_specialise_etp_n1: yup
    .number()
    .nullable()
    .positive(),
  secretaire_specialise_etp_spe_n2: yup
    .number()
    .nullable()
    .positive(),
  secretaire_specialise_etp_spe_n3: yup
    .number()
    .nullable()
    .positive(),
  secretaire_specialise_etp_spe_n4: yup
    .number()
    .nullable()
    .positive(),
  secretaire_specialise_etp_spe_n5: yup
    .number()
    .nullable()
    .positive(),
  secretaire_specialise_etp_spe_n6: yup
    .number()
    .nullable()
    .positive()
});
