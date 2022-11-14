import yup, {
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  TRIBUNAL_REQUIRED,
} from "./yup";

const greffierEditSchema = yup.object().shape({
  cabinet: yup.string(),
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  nom: yup.string().required(NOM_NOT_VALID),
  prenom: yup.string().required(PRENOM_NOT_VALID),
  genre: yup.string().nullable().required(),
  ti: yup.string(TRIBUNAL_REQUIRED).nullable().required(TRIBUNAL_REQUIRED),
});

export { greffierEditSchema };
