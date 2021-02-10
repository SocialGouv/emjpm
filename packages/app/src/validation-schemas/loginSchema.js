import yup from "./yup";

const loginSchema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required(),
});

export { loginSchema };
