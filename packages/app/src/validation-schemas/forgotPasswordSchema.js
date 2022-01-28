import yup, { EMAIL_NOT_VALID } from "./yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
});

export { forgotPasswordSchema };
