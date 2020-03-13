import { parse } from "date-fns";

import yup from "./yup";

const serviceMesureImportSchema = yup.object().shape({
  annee: yup
    .number()
    .required("doit être rempli")
    .min(1900, "doit être au minimum 1900")
    .max(2020, "doit être au maximum 2020"),
  antenne: yup.string(),
  civilite: yup.string().required("doit être rempli"),
  code_postal: yup.number().required("doit être rempli"),
  date_ouverture: yup
    .date()
    .transform(function(value, originalValue) {
      return parse(originalValue, "dd/MM/yyyy", new Date());
    })
    .typeError("doit être au format 'jj/mm/aaaa'")
    .required("doit être rempli"),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required("doit être rempli"),
  residence: yup.string().required("doit être rempli"),
  tribunal_siret: yup.string().required("doit être rempli"),
  type: yup.string().required("doit être rempli")
});

export { serviceMesureImportSchema };
