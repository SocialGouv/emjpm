import yup from "./yup";

const signupServiceSchema = yup.object().shape({
  departement: yup.mixed().required(),
  service: yup.mixed().required(),
});

export { signupServiceSchema };
