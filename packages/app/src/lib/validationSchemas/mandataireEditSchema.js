import yup from "./yup";

const mandataireEditSchema = yup.object().shape({
  address: yup.string(),
  city: yup.string().required(),
  competences: yup.string(),
  dispo_max: yup.number().required(),
  email: yup
    .string()
    .email()
    .required(),
  genre: yup.string().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  siret: yup
    .string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
  zipcode: yup.string().required()
});

export { mandataireEditSchema };
