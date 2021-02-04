import yup from "./yup";

const adminEditSchema = yup.object().shape({
  email: yup.string().email().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
});

export { adminEditSchema };
