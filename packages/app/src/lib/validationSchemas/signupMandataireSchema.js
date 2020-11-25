import { isIndividuel } from "@emjpm/core";

import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE } from "./yup";

const signupMandataireSchema = yup.object().shape({
  dispo_max: yup.number().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  siret: yup.string().when("user", {
    is: (user) => isIndividuel(user),
    then: yup
      .string()
      .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
      .required(),
  }),
  telephone: yup.string().required(),
  telephone_portable: yup.string(),
});

export { signupMandataireSchema };
