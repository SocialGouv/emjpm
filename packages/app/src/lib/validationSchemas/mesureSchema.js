import yup from "./yup";

const mesureSchema = yup.object().shape({
  annee_naissance: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(2019, "l'année choisi doit être au maximum 2019"),
  antenne: yup.string(),
  champ_mesure: yup.string().nullable(),
  city: yup.string().when("country", {
    is: (country) => country === "FR",
    then: yup.string().required(),
  }),
  civilite: yup.string().required(),
  country: yup.string().required(),
  date_nomination: yup.date().required(),
  lieu_vie: yup.string().required(),
  nature_mesure: yup.string().required(),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required(),
  tribunal: yup.string().required(),
  zipcode: yup.string().when("country", {
    is: (country) => country === "FR",
    then: yup.string().length(5).required(),
  }),
});

export { mesureSchema };
