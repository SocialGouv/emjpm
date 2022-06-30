import { validateGeocode } from "./fieldValidators";
import yup, {
  FORM_REQUIRED_MESSAGE,
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  TELEPHONE_NOT_VALID,
} from "./yup";

import { checkDuplicateMandataireSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const dpfiEditSchema = ({ apolloClient }) => {
  let siret = yup
    .string()
    .nullable()
    .matches(
      /^[0-9]{14}$/,
      "Le SIRET est composé de 14 chiffres. Par exemple: 82254321300027."
    )
    .test(
      "siret-duplicate",
      "Le numéro SIRET que vous venez de saisir existe déjà pour un mandataire sur eMJPM.",
      (value, { parent }) => {
        if (!value || value === parent.initialSiret) {
          return true;
        }
        return checkDuplicateMandataireSIRET(apolloClient, value);
      }
    )
    .required();

  return yup.object().shape({
    competences: yup.string(),
    email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
    genre: yup.string().nullable().required(),
    geocode: yup
      .object()
      .required()
      .nullable()
      .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
    nom: yup.string().required(NOM_NOT_VALID),
    prenom: yup.string().required(PRENOM_NOT_VALID),
    adresse_complement: yup.string().nullable(),
    telephone: yup.string().required(TELEPHONE_NOT_VALID),
    telephone_portable: yup.string(),
    siret,
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
};

export { dpfiEditSchema };
