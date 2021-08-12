import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
} from "~/utils/data/numero-rg";

const currentYear = new Date().getFullYear();

const mesureCreateSchema = yup.object().shape({
  annee_naissance: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
  antenne: yup.string().nullable(),
  champ_mesure: yup.string().nullable(),
  civilite: yup.string().required(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(),
  }),
  date_nomination: yup.date().required(),
  date_premier_mesure: yup.date(),
  lieu_vie: yup.string().required(),
  nature_mesure: yup.string().required(),
  numero_dossier: yup.string(),
  numero_rg: yup
    .string()
    .required()
    .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, validateNumeroRG),
  pays: yup.string().required(),
  ti_id: yup.string().required().nullable(),
  ville: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().required(),
  }),
});

export { mesureCreateSchema };
