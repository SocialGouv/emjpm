import * as yup from "yup";

export const FORM_REQUIRED_MESSAGE = "Veuillez renseigner ce champ.";

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
    email:
      "Veuillez saisir une adresse e-mail valide. Par exemple : john.doe@justice.fr.",
    length: "Le champ doit comporter ${length} caractères.",
  },
});

export default yup;
