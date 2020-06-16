import yup from "./yup";

const loginSchema = yup.object().shape({
  password: yup.string().required(),
  username: yup.string().required(),
});

export { loginSchema };
