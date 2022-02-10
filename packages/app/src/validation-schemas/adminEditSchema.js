import yup, { EMAIL_NOT_VALID, NOM_NOT_VALID, PRENOM_NOT_VALID } from "./yup";

const adminEditSchema = yup.object().shape({
  email: yup.string().email().required(EMAIL_NOT_VALID),
  nom: yup.string().required(NOM_NOT_VALID),
  prenom: yup.string().required(PRENOM_NOT_VALID),
});

export { adminEditSchema };
