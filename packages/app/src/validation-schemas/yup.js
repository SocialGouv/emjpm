import * as yup from "yup";

export const FORM_REQUIRED_MESSAGE = "Veuillez renseigner ce champ.";
export const EMAIL_NOT_VALID =
  "Veuillez saisir une adresse e-mail valide. Par exemple : john.doe@justice.fr";
export const FORM_YEAR_NOT_VALID =
  "Veuillez saisir une année valide. Exemple : 1970";
export const FORM_DATE_NOT_VALID =
  "Veuillez saisir une année valide. Exemple 01/01/2021";

yup.setLocale({
  mixed: {
    required: FORM_REQUIRED_MESSAGE,
  },
  number: {
    integer: "Le nombre indiqué doit être un entier",
    max: "Le nombre indiqué doit être inférieur ou égal à ${max}",
    min: "Le nombre indiqué doit être supérieur ou égal à ${min}",
    positive: "Le nombre indiqué doit être positif",
  },
  string: {
    email: EMAIL_NOT_VALID,
    length: "Le champ doit comporter ${length} caractères.",
  },
});

export default yup;
