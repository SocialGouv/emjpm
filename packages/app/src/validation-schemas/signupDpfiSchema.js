import { validateGeocode } from "./fieldValidators";
import yup, {
  FORM_REQUIRED_MESSAGE,
  TELEPHONE_NOT_VALID,
  TELEPHONE_PORTABLE_NOT_VALID,
} from "./yup";

const signupDpfiSchema = yup.object().shape({
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  siret: yup
    .string()
    .matches(
      /^[0-9]{14}$/,
      "Le SIRET est composé de 14 chiffres. Par exemple: 21254321300027"
    )
    .required(),

  telephone: yup.string().required(TELEPHONE_NOT_VALID),
  telephone_portable: yup.string(TELEPHONE_PORTABLE_NOT_VALID),
});

export { signupDpfiSchema };
