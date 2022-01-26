import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE, EMAIL_NOT_VALID } from "./yup";

const serviceAntenneSchema = yup.object().shape({
  contact_email: yup.string(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  contact_firstname: yup.string().required(),
  contact_lastname: yup.string().required(),
  contact_phone: yup.string().required(),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  mesures_max: yup
    .number()
    .required()
    .test("mesures_max", (value, { parent, path, createError }) => {
      if (!value) {
        return true;
      }
      const { otherAntennesMesuresMaxSum, mesuresMax } = parent;
      const total = otherAntennesMesuresMaxSum + parseInt(value);
      if (total <= mesuresMax) {
        return true;
      }
      return createError({
        message: `Le total des mesures souhaitées par antenne ne doit pas excéder le nombre total de mesures souhaitées au niveau global pour le service. C'est à dire, actuellement ${mesuresMax}. Le total par antenne s'élèverai à ${total}. Veuillez ajuster le nombre global de mesures souhaitées pour pouvoir continuer.`,
        path,
      });
    }),
  name: yup.string().required(),
});

export { serviceAntenneSchema };
