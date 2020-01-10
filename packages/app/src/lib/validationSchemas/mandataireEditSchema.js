import * as Yup from "yup";

const mandataireEditSchema = Yup.object().shape({
  competences: Yup.string(),
  dispo_max: Yup.number("Le champs doit être en nombre").required("Champ obligatoire"),
  email: Yup.string("Champ obligatoire")
    .email("Le format de votre email n'est pas correct")
    .required("Champ obligatoire"),
  genre: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  nb_secretariat: Yup.number(),
  nom: Yup.string().required("Champ obligatoire"),
  prenom: Yup.string().required("Champ obligatoire"),
  secretariat: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.boolean()
    })
    .required("Champ obligatoire"),
  siret: Yup.string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required("Champ obligatoire"),
  telephone: Yup.string().required("Champ obligatoire"),
  telephone_portable: Yup.string()
});

export { mandataireEditSchema };
