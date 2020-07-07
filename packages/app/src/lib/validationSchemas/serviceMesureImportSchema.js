import yup from "./yup";

const REGEX_DATE_OUVERTURE = /^([0-2][0-9]|(3)[0-1])(\/)((0[0-9])|(1[0-2]))(\/)(([12][0-9]{3}))$/;

const serviceMesureImportSchema = yup.object().shape({
  annee: yup
    .number()
    .required("doit être rempli")
    .min(1900, "doit être au minimum 1900")
    .max(2020, "doit être au maximum 2020"),
  antenne: yup.string(),
  civilite: yup.string().required("doit être rempli"),
  code_postal: yup.string().matches(/^[0-9]{4}|[0-9]{5}$/, "4 ou 5 chiffres"),
  date_ouverture: yup
    .string()
    .matches(REGEX_DATE_OUVERTURE, "doit être au formats 'jj/mm/aaaa'")
    .required("doit être rempli"),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required("doit être rempli"),
  lieu_vie: yup.string().required("doit être rempli"),
  tribunal_siret: yup.string().required("doit être rempli"),
  type: yup.string().required("doit être rempli"),
});

export { serviceMesureImportSchema };
