import * as Yup from "yup";

const mandataireSignupSchema = Yup.object().shape({
  dispo_max: Yup.number("Le champs doit être en nombre").required("Champ obligatoire"),
  genre: Yup.string().required("Champ obligatoire"),
  geocode: Yup.object()
    .nullable()
    .required("Champ obligatoire"),
  siret: Yup.string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required("Champ obligatoire"),
  telephone: Yup.string().required("Champ obligatoire"),
  telephone_portable: Yup.string(),
  tis: Yup.mixed().required("Champ obligatoire")
});

export { mandataireSignupSchema };
