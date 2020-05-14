const yup = require("yup");

const MESURE_TYPES = [
  "curatelle",
  "curatelle renforcée",
  "curatelle renforcée à la personne",
  "curatelle renforcée aux biens",
  "curatelle renforcée aux biens et à la personne",
  "curatelle simple",
  "curatelle simple à la personne",
  "curatelle simple aux biens",
  "curatelle simple à la personne",
  "curatelle simple aux biens et à la personne",
  "maj",
  "mandat de protection future",
  "mesure ad hoc",
  "sauvegarde de justice",
  "sauvegarde de justice avec mandat spécial",
  "subrogé curateur",
  "subrogé tuteur",
  "tutelle",
  "tutelle à la personne",
  "tutelle aux biens",
  "tutelle aux biens et à la personne"
];

const MESURE_RESIDENCES = [
  "domicile",
  "en établissement",
  "en établissement avec conservation du domicile",
  "sdf"
];

// 20/11/2015 or 20/11/15
const REGEX_DATE_OUVERTURE = /^([0-2][0-9]|(3)[0-1])(\/)((0[0-9])|(1[0-2]))(\/)(([12][0-9]{3}))$/;

const actionsMesuresImporterSchema = yup.object().shape({
  annee: yup
    .number("doit être au format 'aaaa'")
    .required("doit être rempli")
    .min(1900, "doit être au minimum 1900")
    .max(2020, "doit être au maximum 2020"),
  antenne: yup.string(),
  civilite: yup
    .mixed()
    .oneOf(
      ["F", "H"],
      field => `'${field.value}' n'est pas une valeur acceptée`
    )
    .required("doit être rempli"),
  code_postal: yup.string().matches(/^[0-9]{4}|[0-9]{5}$/, "4 ou 5 chiffres"),
  date_ouverture: yup
    .string()
    .matches(REGEX_DATE_OUVERTURE, "doit être au formats 'jj/mm/aaaa'")
    .required("doit être rempli"),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required("doit être rempli"),
  residence: yup
    .mixed()
    .oneOf(
      MESURE_RESIDENCES,
      field => `'${field.value}' n'est pas une valeur acceptée`
    )
    .required("doit être rempli"),
  tribunal_siret: yup.string().required("doit être rempli"),
  type: yup
    .mixed()
    .oneOf(
      MESURE_TYPES,
      field => `'${field.value}' n'est pas une valeur acceptée`
    )
    .required("doit être rempli")
});

module.exports = { actionsMesuresImporterSchema };
