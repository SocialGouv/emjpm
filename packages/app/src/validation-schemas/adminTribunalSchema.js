import yup from "./yup";

const adminTribunalSchema = yup.object().shape({
  email: yup.string().email().nullable(),
  etablissement: yup.string().required(),
  geocode: yup.object().nullable(),
  siret: yup.string().required(),
  telephone: yup.string(),
  actual_tribunal_id: yup.number().nullable().required(),
});

export { adminTribunalSchema };
