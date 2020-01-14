import yup from "./yup";

const serviceSchema = yup.object().shape({
  competences: yup.string(),
  dispo_max: yup.number().required(),
  email: yup.string().required(),
  etablissement: yup.string().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string()
});

export { serviceSchema };
