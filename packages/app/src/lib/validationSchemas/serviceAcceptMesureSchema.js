import yup from "./yup";

const serviceAcceptMesureSchema = yup.object().shape({
  city: yup.string().when("country", {
    is: (country) => country.value && country.value === "FR",
    then: yup.string().required(),
  }),
  country: yup.object().shape({
    value: yup.string().required(),
  }),
  date_ouverture: yup.date().required(),
  lieu_vie: yup.string().required(),
  zipcode: yup.string().when("country", {
    is: (country) => country.value && country.value === "FR",
    then: yup.string().length(5).required(),
  }),
});

export { serviceAcceptMesureSchema };
