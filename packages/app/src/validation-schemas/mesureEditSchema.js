import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
} from "~/utils/data/numero-rg";

const currentYear = new Date().getFullYear();

const mesureEditSchema = yup.object().shape({
  annee_naissance: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
  antenne: yup.string().nullable(),
  civilite: yup.string().required(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(),
  }),
  date_nomination: yup.date().required(),
  date_premier_mesure: yup.date(),
  date_protection_en_cours: yup.date().required(),
  numero_dossier: yup.string(),
  numero_rg: yup
    .string()
    .required()
    .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, (value, { parent }) => {
      if (validateNumeroRG(value)) {
        return true;
      }
      // allow dedup history original invalid numero rg
      if (value === parent.initialNumeroRG) {
        return true;
      }
      return false;
    }),
  ti_id: yup.string().required(),
});

export { mesureEditSchema };
