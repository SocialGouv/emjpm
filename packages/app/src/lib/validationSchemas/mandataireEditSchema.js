import yup from "./yup";

const mandataireEditSchema = yup.object().shape({
  competences: yup.string(),
  dispo_max: yup.number().required(),
  email: yup
    .string()
    .email()
    .required(),
  genre: yup.string().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  nb_secretariat: yup.number(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  secretariat: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.boolean()
    })
    .required(),
  siret: yup
    .string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string()
});

export { mandataireEditSchema };
