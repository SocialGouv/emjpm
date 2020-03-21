import yup from "./yup";

const adminServiceSchema = yup.object().shape({
  email: yup.string().email(),
  etablissement: yup.string().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  siret: yup
    .string()
    .matches(/^[\d]{14}$/, "Doit contenir exactement 14 chiffres")
    .required(),
  telephone: yup.string()
});

export { adminServiceSchema };
