import { validateGeocode } from "./fieldValidators";
import yup, {
  FORM_REQUIRED_MESSAGE,
  EMAIL_NOT_VALID,
  NOM_NOT_VALID,
  PRENOM_NOT_VALID,
  TELEPHONE_NOT_VALID,
} from "./yup";

import { checkDuplicateMandataireSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const mandataireEditSchema = ({ type, apolloClient }) => {
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
    );
  if (type !== "prepose") {
    siret = siret.required();
  }
  return yup.object().shape({
    competences: yup.string(),
    dispo_max: yup
      .number()
      .typeError(
        "Veuillez saisir un nombre de disponibilité valide. Par exemple: 5."
      )
      .required(
        "Veuillez saisir un nombre de disponibilité valide. Par exemple: 5."
      ),
    email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
    genre: yup.string().nullable().required(),
    geocode: yup
      .object()
      .required()
      .nullable()
      .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
    nom: yup.string().required(NOM_NOT_VALID),
    prenom: yup.string().required(PRENOM_NOT_VALID),
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
    adresse_complement: yup.string().nullable(),
    telephone: yup.string().required(TELEPHONE_NOT_VALID),
    telephone_portable: yup.string(),
    tis: yup.mixed().required(),
    siret,
    suspendActivityReason: yup.string().nullable().required(),
  });
};

export { mandataireEditSchema };
