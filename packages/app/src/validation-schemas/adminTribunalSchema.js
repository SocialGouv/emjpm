import yup, { EMAIL_NOT_VALID, SIRET_NOT_VALID } from "./yup";

const adminTribunalSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).nullable(),
  etablissement: yup.string().required(),
  geocode: yup.object().nullable(),
  siret: yup.string().required(SIRET_NOT_VALID),
  telephone: yup.string(),
  actual_tribunal_id: yup.number().nullable().required(),
});

export { adminTribunalSchema };
