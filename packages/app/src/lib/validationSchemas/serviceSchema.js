import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const serviceSchema = yup.object().shape({
  competences: yup.string().max(255, "Maximum 255 caractères"),
  dispo_max: yup.number().required(),
  email: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string(),
});

export { serviceSchema };
