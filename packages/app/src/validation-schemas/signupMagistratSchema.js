import yup from "./yup";

const signupMagistratSchema = yup.object().shape({
  cabinet: yup.string(),
  ti: yup.string().nullable().required(),
});

export { signupMagistratSchema };
