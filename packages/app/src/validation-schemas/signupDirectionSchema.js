import yup from "./yup";

const signupDirectionSchema = yup.object().shape({
  departement: yup.number().nullable().when("directionType", {
    is: "departemental",
    then: yup.number().required(),
  }),
  directionType: yup.string().required(),
  region: yup.number().nullable().when("directionType", {
    is: "regional",
    then: yup.number().required(),
  }),
});

export { signupDirectionSchema };
