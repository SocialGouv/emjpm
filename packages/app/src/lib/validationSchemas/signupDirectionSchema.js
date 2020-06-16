import yup from "./yup";

const signupDirectionSchema = yup.object().shape({
  directionType: yup.string().required(),
});

export { signupDirectionSchema };
