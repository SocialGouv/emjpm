import yup, { EMAIL_NOT_VALID } from "./yup";

const loginSchema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
});

export { loginSchema };
