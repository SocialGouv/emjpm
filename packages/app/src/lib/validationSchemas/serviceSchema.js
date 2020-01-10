import * as Yup from "yup";

const serviceSchema = Yup.object().shape({
  competences: Yup.string(),
  dispo_max: Yup.number(),
  email: Yup.string(),
  etablissement: Yup.string(),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  nom: Yup.string(),
  prenom: Yup.string(),
  telephone: Yup.string()
});

export { serviceSchema };
