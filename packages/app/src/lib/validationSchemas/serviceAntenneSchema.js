import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const serviceAntenneSchema = yup.object().shape({
  contact_email: yup.string().required(),
  contact_firstname: yup.string().required(),
  contact_lastname: yup.string().required(),
  contact_phone: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  mesures_max: yup.number().required(),
  name: yup.string().required(),
});

export { serviceAntenneSchema };
