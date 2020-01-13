import yup from "./yup";

const adminServiceSchema = yup.object().shape({
  email: yup.string().email(),
  etablissement: yup.string().required(),
  geocode: yup
    .object()
    .nullable()
    .required(),
  telephone: yup.string()
});

export { adminServiceSchema };
