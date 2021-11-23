import yup from "./yup";

const signupGreffierSchema = yup.object().shape({
  cabinet: yup.string(),
  ti: yup.string().nullable().required(),
});

export { signupGreffierSchema };
