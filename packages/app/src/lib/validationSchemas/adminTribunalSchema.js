import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const adminTribunalSchema = yup.object().shape({
  email: yup.string().email(),
  etablissement: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  siret: yup.string().required(),
  telephone: yup.string(),
});

export { adminTribunalSchema };
