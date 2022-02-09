import yup, { EMAIL_NOT_VALID, NOM_NOT_VALID } from "./yup";

const editorTokenSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  name: yup.string().required(NOM_NOT_VALID),
});

export { editorTokenSchema };
