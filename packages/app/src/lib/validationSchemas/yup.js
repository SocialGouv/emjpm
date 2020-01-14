import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Champs obligatoire"
  },
  string: {
    email: "Le format de l'adresse email n'est pas correct"
  }
});

export default yup;
