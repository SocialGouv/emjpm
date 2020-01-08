import * as Yup from "yup";

const directionEditSchema = Yup.object().shape({
  email: Yup.string("Champ obligatoire")
    .email("Le format de votre email n'est pas correct")
    .required("Champ obligatoire"),
  nom: Yup.string().required("Champ obligatoire"),
  prenom: Yup.string().required("Champ obligatoire")
});

export { directionEditSchema };
