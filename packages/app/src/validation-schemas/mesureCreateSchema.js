import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
  MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE,
} from "~/utils/data/numero-rg";
import { checkDuplicateNumeroRGByTiId } from "~/query-service/emjpm-hasura/checkDuplicateNumeroRG";

const currentYear = new Date().getFullYear();

const mesureCreateSchema = ({ apolloClient }) =>
  yup.object().shape({
    annee_naissance: yup
      .number()
      .required()
      .min(1900, "l'année choisi doit être au minimum 1900")
      .max(currentYear, "l'année choisi doit être au maximum " + currentYear),
    antenne: yup.string().nullable(),
    champ_mesure: yup.string().nullable(),
    civilite: yup.string().required(),
    code_postal: yup.string().when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().length(5).required(),
    }),
    date_nomination: yup.date().required(),
    date_premier_mesure: yup.date().nullable(),
    lieu_vie: yup.string().required(),
    nature_mesure: yup.string().required(),
    numero_dossier: yup.string(),
    numero_rg: yup
      .string()
      .required()
      .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, validateNumeroRG)
      .test(
        "numero_rg-duplicate",
        MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE,
        (value, { parent }) => {
          const tiId = parent.ti_id;
          if (!tiId || !validateNumeroRG(value)) {
            return true;
          }
          return checkDuplicateNumeroRGByTiId(apolloClient, value, tiId);
        }
      ),
    pays: yup.string().required(),
    ti_id: yup.string().required().nullable(),
    ville: yup.string().when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().required(),
    }),
  });

export { mesureCreateSchema };
