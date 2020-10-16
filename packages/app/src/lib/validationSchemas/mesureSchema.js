import yup from "./yup";

const mesureSchema = yup.object().shape({
  annee_naissance: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(2019, "l'année choisi doit être au maximum 2019"),
  antenne: yup.string().nullable(),
  champ_mesure: yup.string().nullable(),
  civilite: yup.string().required(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(),
  }),
  date_nomination: yup.date().required(),
  lieu_vie: yup.string().required(),
  nature_mesure: yup.string().required(),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required(),
  pays: yup.string().required(),
  tribunal: yup.string().required(),
  ville: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().required(),
  }),
});

export { mesureSchema };
