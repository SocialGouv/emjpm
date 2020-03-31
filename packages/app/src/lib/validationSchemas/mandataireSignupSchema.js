import yup from "./yup";

const mandataireSignupSchema = yup.object().shape({
  address: yup.string(),
  city: yup.string().required(),
  dispo_max: yup.number().required(),
  genre: yup.string().required(),
  siret: yup
    .string()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
    .required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
  tis: yup.mixed().required(),
  zipcode: yup.string().required()
});

export { mandataireSignupSchema };
