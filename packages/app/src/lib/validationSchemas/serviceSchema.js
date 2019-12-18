import * as Yup from "yup";

const serviceSchema = Yup.object().shape({
  dispo_max: Yup.number(),
  email: Yup.string(),
  etablissement: Yup.string(),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  information: Yup.string(),
  nom: Yup.string(),
  prenom: Yup.string(),
  telephone: Yup.string()
});

export { serviceSchema };
