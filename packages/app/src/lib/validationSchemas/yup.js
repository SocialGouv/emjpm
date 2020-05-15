import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Veuillez renseigner ce champ."
  },
  number: {
    max: "Doit être inférieur à ${max}",
    min: "Doit être supérieur à ${min}"
  },
  string: {
    email: "Le format de l'adresse email n'est pas correct.",
    length: "Le champ doit comporter ${length} caractères."
  }
});

export default yup;
