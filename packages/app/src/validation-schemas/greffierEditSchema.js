import yup, { EMAIL_NOT_VALID } from "./yup";

const greffierEditSchema = yup.object().shape({
  cabinet: yup.string(),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  genre: yup.string().nullable().required(),
});

export { greffierEditSchema };
