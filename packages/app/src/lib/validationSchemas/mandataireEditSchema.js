import * as Yup from "yup";

const mandataireEditSchema = Yup.object().shape({
  dispo_max: Yup.number("Le champs doit être en nombre").required("Champ obligatoire"),
  email: Yup.string("Champ obligatoire")
    .email("Le format de votre email n'est pas correct")
    .required("Champ obligatoire"),
  genre: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  nom: Yup.string().required("Champ obligatoire"),
  prenom: Yup.string().required("Champ obligatoire"),
  siret: Yup.string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required("Champ obligatoire"),
  telephone: Yup.string().required("Champ obligatoire"),
  telephone_portable: Yup.string()
});

export { mandataireEditSchema };
