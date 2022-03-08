import yup, {
  FORM_REQUIRED_MESSAGE,
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  TELEPHONE_NOT_VALID,
} from "./yup";
import { validateGeocode } from "./fieldValidators";

const adminUserServiceSchema = yup.object().shape({
  user_email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  user_nom: yup.string().required(NOM_NOT_VALID),
  user_prenom: yup.string().required(PRENOM_NOT_VALID),
  user_genre: yup.string().nullable().required(),
  competences: yup.string().max(255, "Maximum 255 caractères"),
  dispo_max: yup
    .number()
    .required()
    .test("dispo_max", (value, { parent, path, createError }) => {
      if (!value) {
        return true;
      }
      if (!parent.antennes_count) {
        return true;
      }
      const dispo_globale = parseInt(value);
      const max = parent.antennes_mesures_max;
      if (dispo_globale >= max) {
        return true;
      }
      return createError({
        message: `Le nombre de mesures souhaitées au niveau global pour le service doit être égal ou supérieur au total du nombre de mesures souhaitées par antenne. C'est à dire, actuellement ${max}.`,
        path,
      });
    }),
  email: yup.string(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
  geocode: yup
    .object()
    .required()
    .nullable()
    .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
  adresse: yup
    .string()
    .nullable()
    .test(
      "required-ifnot-use-location",
      FORM_REQUIRED_MESSAGE,
      (value, { parent }) => {
        if (parent.useLocationAdresse) {
          return true;
        }
        value = value?.trim();
        return !!value;
      }
    ),
  code_postal: yup.string().nullable(),
  ville: yup.string().nullable(),
  etablissement: yup.string().required(),
  genre: yup.string().nullable().required(),
  nom: yup.string().required(NOM_NOT_VALID),
  prenom: yup.string().required(PRENOM_NOT_VALID),
  telephone: yup.string(TELEPHONE_NOT_VALID),
  tis: yup.mixed().required(),
  suspendActivity: yup.boolean().nullable(),
  suspendActivityReason: yup
    .string()
    .nullable()
    .when("suspendActivity", {
      is: (suspendActivity) => {
        console.log({ suspendActivity });
        return suspendActivity === true;
      },
      then: yup.string().nullable().required(),
    }),
});

export { adminUserServiceSchema };
