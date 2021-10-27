import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
  MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE,
} from "~/utils/data/numero-rg";
import { checkDuplicateNumeroRGByTiId } from "~/query-service/emjpm-hasura/checkDuplicateNumeroRG";

const currentYear = new Date().getFullYear();

const mesureEditSchema = ({ apolloClient }) =>
  yup.object().shape({
    annee_naissance: yup
      .number()
      .nullable()
      .required()
      .min(1900, "l'année choisi doit être au minimum 1900")
      .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
    antenne: yup.string().nullable(),
    civilite: yup.string().required(),
    code_postal: yup
      .string()
      .when("pays", {
        is: (pays) => pays === "FR",
        then: yup.string().length(5).required(),
      })
      .nullable(),
    date_nomination: yup.date().required().nullable(),
    date_premier_mesure: yup.date().nullable(),
    date_protection_en_cours: yup.date().required().nullable(),
    numero_dossier: yup.string(),
    numero_rg: yup
      .string()
      .required()
      .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, (value, { parent }) => {
        if (validateNumeroRG(value)) {
          return true;
        }
        // allow dedup history original invalid numero rg
        if (value === parent.initialNumeroRG) {
          return true;
        }
        return false;
      })
      .test(
        "numero_rg-duplicate",
        MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE,
        (value, { parent }) => {
          const tiId = parent.ti_id;
          if (
            value === parent.initialNumeroRG &&
            tiId &&
            tiId.toString() === parent.initialTiId.toString()
          ) {
            return true;
          }
          if (!tiId || !validateNumeroRG(value)) {
            return true;
          }
          return checkDuplicateNumeroRGByTiId(apolloClient, value, tiId);
        }
      ),
    ti_id: yup.string().nullable().required(),
  });

export { mesureEditSchema };
