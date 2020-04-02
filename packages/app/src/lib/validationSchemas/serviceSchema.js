import yup from "./yup";

const serviceSchema = yup.object().shape({
  city: yup.string().required(),
  competences: yup.string().max(255, "Maximum 255 caractères"),
  dispo_max: yup.number().required(),
  email: yup.string().required(),
  etablissement: yup.string().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string(),
  zipcode: yup
    .string()
    .length(5)
    .required()
});

export { serviceSchema };
