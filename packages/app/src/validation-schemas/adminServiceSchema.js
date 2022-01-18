import yup from "./yup";

import { checkDuplicateListeBlancheSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const adminServiceSchema = ({ apolloClient }) =>
  yup.object().shape({
    departements: yup
      .array()
      .of(
        yup.object().shape({
          departement_code: yup.string(),
        })
      )
      .required(),
    email: yup.string().email(),
    etablissement: yup.string().required(),
    adresse: yup.string().nullable().required(),
    code_postal: yup
      .string()
      .nullable()
      .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
      .required(),
    ville: yup.string().nullable().required(),
    org_adresse: yup.string().nullable().when("org_gestionnaire", {
      is: true,
      then: yup.string().required(),
    }),
    org_code_postal: yup
      .string()
      .nullable()
      .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
      .when("org_gestionnaire", {
        is: true,
        then: yup.string().required(),
      }),
    org_gestionnaire: yup.boolean().nullable().required(),
    org_nom: yup.string().nullable().when("org_gestionnaire", {
      is: true,
      then: yup.string().required(),
    }),
    org_ville: yup.string().nullable().when("org_gestionnaire", {
      is: true,
      then: yup.string().required(),
    }),
    siret: yup
      .string()
      .nullable()
      .matches(/^[\d]{14}$/, "Doit contenir exactement 14 chiffres")
      .required()
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà pour un service sur eMJPM.",
        (value, { parent }) => {
          if (!value || value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateListeBlancheSIRET(apolloClient, value);
        }
      ),
    telephone: yup.string(),
  });

export { adminServiceSchema };
