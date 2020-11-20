import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const mandataireEditSchema = yup.object().shape({
  competences: yup.string(),
  dispo_max: yup.number().required(),
  email: yup.string().email().required(),
  genre: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
});

export { mandataireEditSchema };
