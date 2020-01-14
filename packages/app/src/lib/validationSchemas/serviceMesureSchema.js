import yup from "./yup";

const serviceMesureSchema = yup.object().shape({
  annee: yup
    .number()
    .required()
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(2019, "l'année choisi doit être au maximum 2019"),
  antenne: yup.string(),
  civilite: yup.string().required(),
  date_ouverture: yup.date().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  numero_dossier: yup.string().required(),
  numero_rg: yup.string().required(),
  residence: yup.string().required(),
  tribunal: yup.string().required(),
  type: yup.string().required()
});

export { serviceMesureSchema };
