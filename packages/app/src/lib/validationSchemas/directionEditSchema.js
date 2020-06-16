import yup from "./yup";

const directionEditSchema = yup.object().shape({
  email: yup.string().email().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
});

export { directionEditSchema };
