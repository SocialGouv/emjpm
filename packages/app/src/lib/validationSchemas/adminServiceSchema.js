import yup from "../validationSchemas/yup";

const adminServiceSchema = yup.object().shape({
  adresse: yup.string().required(),
  code_postal: yup
    .string()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .required(),
  departement: yup.string().required(),
  email: yup.string().email(),
  etablissement: yup.string().required(),
  siret: yup
    .string()
    .matches(/^[\d]{14}$/, "Doit contenir exactement 14 chiffres")
    .required(),
  telephone: yup.string(),
  ville: yup.string().required(),
});

export { adminServiceSchema };
