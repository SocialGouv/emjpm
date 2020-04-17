import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Veuillez renseigner ce champ."
  },
  number: {
    integer: "Doit être un entier",
    positive: "Doit être positif"
  },
  string: {
    email: "Le format de l'adresse email n'est pas correct.",
    length: "Le champ doit comporter ${length} caractères."
  }
});

export default yup;
