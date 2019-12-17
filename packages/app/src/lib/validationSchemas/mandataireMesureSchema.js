import * as Yup from "yup";

const mandataireMesureSchema = Yup.object().shape({
  annee: Yup.number()
    .required("Champ obligatoire")
    .min(1900, "l'année choisi doit être au minimum 1900")
    .max(2019, "l'année choisi doit être au maximum 2019"),
  civilite: Yup.string().required("Champ obligatoire"),
  date_ouverture: Yup.date().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  numero_dossier: Yup.string().required("Champ obligatoire"),
  numero_rg: Yup.string().required("Champ obligatoire"),
  residence: Yup.string().required("Champ obligatoire"),
  tribunal: Yup.string().required("Champ obligatoire"),
  type: Yup.string().required("Champ obligatoire")
});

export { mandataireMesureSchema };
