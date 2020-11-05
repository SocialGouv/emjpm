import yup from "./yup";

const mandataireEditSchema = yup.object().shape({
  competences: yup.string(),
  dispo_max: yup.number().required(),
  email: yup.string().email().required(),
  genre: yup.string().required(),
  geocode: yup.object().nullable().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
});

export { mandataireEditSchema };
