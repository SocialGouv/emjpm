import yup, {
  CODE_POSTAL_NOT_VALID,
  EMAIL_NOT_VALID,
  SIRET_NOT_VALID,
} from "./yup";

import { checkDuplicateListeBlancheSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

const adminSdpfSchema = ({ apolloClient }) =>
  yup.object().shape({
    departements: yup
      .array()
      .of(
        yup.object().shape({
          departement_code: yup.string(),
        })
      )
      .required(),
    email: yup.string().email(EMAIL_NOT_VALID),
    etablissement: yup.string().required(),
    adresse: yup.string().nullable().required(),
    code_postal: yup
      .string()
      .nullable()
      .matches(/^[0-9]{5}$/, CODE_POSTAL_NOT_VALID)
      .required(CODE_POSTAL_NOT_VALID),
    ville: yup.string().nullable().required(),
    org_adresse: yup.string().nullable().when("org_gestionnaire", {
      is: true,
      then: yup.string().required(),
    }),
    org_code_postal: yup
      .string()
      .nullable()
      .matches(
        /^[0-9]{5}$/,
        "Le code postal doit être composé de 5 chiffres. Par exemple: 75001."
      )
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
      .matches(/^[\d]{14}$/, SIRET_NOT_VALID)
      .required(SIRET_NOT_VALID)
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà dans la liste blanche sur eMJPM.",
        (value, { parent }) => {
          if (!value || value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateListeBlancheSIRET(apolloClient, `sdpf_${value}`);
        }
      ),
    telephone: yup.string(),
  });

export { adminSdpfSchema };
