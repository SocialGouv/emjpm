import yup from "./yup";

const serviceAcceptMesureSchema = yup.object().shape({
  address: yup.string().when("country", {
    is: country => country.value && country.value === "FR",
    then: yup.string().required()
  }),
  country: yup.object().shape({
    value: yup.string().required()
  }),
  date_ouverture: yup.date().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  residence: yup.string().required()
});

export { serviceAcceptMesureSchema };
