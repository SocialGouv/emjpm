import yup from "./yup";

const adminTribunalSchema = yup.object().shape({
  email: yup.string().email(),
  etablissement: yup.string().required(),
  geocode: yup.object().nullable(),
  siret: yup.string().required(),
  telephone: yup.string(),
});

export { adminTribunalSchema };
