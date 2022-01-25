import yup from "./yup";

const magistratEditSchema = yup.object().shape({
  cabinet: yup.string(),
  email: yup.string().email().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  genre: yup.string().nullable().required(),
});

export { magistratEditSchema };
