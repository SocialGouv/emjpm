import yup from "./yup";

const signupServiceSchema = yup.object().shape({
  departements: yup.mixed().required(),
  service: yup.mixed().required(),
});

export { signupServiceSchema };
