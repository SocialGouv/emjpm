import yup from "./yup";

const signupGreffierSchema = yup.object().shape({
  cabinet: yup.string(),
  ti: yup.string().required(),
});

export { signupGreffierSchema };
