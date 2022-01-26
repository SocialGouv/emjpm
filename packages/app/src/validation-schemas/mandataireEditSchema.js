import { validateGeocode } from "./fieldValidators";
import yup, { FORM_REQUIRED_MESSAGE, EMAIL_NOT_VALID } from "./yup";

import { checkDuplicateMandataireSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const mandataireEditSchema = ({ type, apolloClient }) => {
  let siret = yup
    .string()
    .nullable()
    .matches(/^[0-9]{14}$/, "Le SIRET est composé de 14 chiffres")
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
    dispo_max: yup.number().required(),
    email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
    genre: yup.string().nullable().required(),
    geocode: yup
      .object()
      .required()
      .nullable()
      .test("geocode-check", FORM_REQUIRED_MESSAGE, validateGeocode),
    nom: yup.string().required(),
    prenom: yup.string().required(),
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
    telephone: yup.string().required(),
    telephone_portable: yup.string(),
    tis: yup.mixed().required(),
    siret,
  });
};

export { mandataireEditSchema };
