import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Veuillez renseigner ce champ."
  },
  number: {
    integer: "Le nombre indiqué doit être un entier",
    max: "Le nombre indiqué doit être inférieur ou égal à ${max}",
    min: "Le nombre indiqué doit être supérieur ou égal à ${min}",
    positive: "Le nombre indiqué doit être positif"
  },
  string: {
    email: "Le format de l'adresse email n'est pas correct.",
    length: "Le champ doit comporter ${length} caractères."
  }
});

export default yup;
