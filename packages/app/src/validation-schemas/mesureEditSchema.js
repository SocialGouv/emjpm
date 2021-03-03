import yup from "./yup";

const currentYear = new Date().getFullYear();

const mesureEditSchema = yup.object().shape({
  annee_naissance: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
  antenne: yup.string().nullable(),
  civilite: yup.string().required(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(),
  }),
  date_nomination: yup.date().required(),
  date_premier_mesure: yup.date(),
  date_protection_en_cours: yup.date().required(),
  numero_dossier: yup.string(),
  numero_rg: yup.string().required(),
  ti_id: yup.string().required(),
});

export { mesureEditSchema };
