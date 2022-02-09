import yup, { SERVICE_NOT_VALID } from "./yup";

const signupServiceSchema = yup.object().shape({
  departements: yup.mixed().required(),
  service: yup.mixed().required(SERVICE_NOT_VALID),
});

export { signupServiceSchema };
