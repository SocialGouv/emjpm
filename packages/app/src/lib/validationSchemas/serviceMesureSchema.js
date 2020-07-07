import yup from "./yup";

const serviceMesureSchema = yup.object().shape({
  annee: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(2019, "l'année choisi doit être au maximum 2019"),
  antenne: yup.string(),
  city: yup.string().when("country", {
    is: (country) => country.value && country.value === "FR",
    then: yup.string().required(),
  }),
  civilite: yup.string().required(),
  country: yup.object().shape({
    value: yup.string().required(),
  }),
  date_ouverture: yup.date().required(),
  lieu_vie: yup.string().required(),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required(),
  tribunal: yup.string().required(),
  type: yup.string().required(),
  zipcode: yup.string().when("country", {
    is: (country) => country.value && country.value === "FR",
    then: yup.string().length(5).required(),
  }),
});

export { serviceMesureSchema };
