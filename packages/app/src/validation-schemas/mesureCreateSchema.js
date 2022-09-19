import yup, {
  FORM_YEAR_NOT_VALID,
  CODE_POSTAL_NOT_VALID,
  FORM_DATE_NOT_VALID,
  parseDateStringWhenNullable,
  parseDateString,
} from "./yup";
import {
  validateNumeroRG,
  checkNumeroRgAlphanum,
  checkNumeroRgLengthLt,
  checkNumeroRgLengthGt,
  MESSAGE_VALID_NUMERO_RG_ALPHANUM,
  MESSAGE_VALID_NUMERO_RG_LENGTH_LT,
  MESSAGE_VALID_NUMERO_RG_LENGTH_GT,
  MESSAGE_DUPLICATE_NUMERO_RG_MANDATAIRE,
} from "~/utils/data/numero-rg";
import { checkDuplicateNumeroRGByTiId } from "~/query-service/emjpm-hasura/checkDuplicateNumeroRG";

const currentYear = new Date().getFullYear();

const mesureCreateSchema = ({ apolloClient }) =>
  yup.object().shape({
    annee_naissance: yup
      .number(FORM_YEAR_NOT_VALID)
      .typeError(FORM_YEAR_NOT_VALID)
      .required(FORM_YEAR_NOT_VALID)
      .min(
        1900,
        "L'année choisie doit être au minimum 1900. Par exemple: 1970."
      )
      .max(
        currentYear,
        `L'année choisi doit être au maximum ${currentYear}. Par exemple: 1970.`
      ),
    antenne: yup.string().nullable(),
    champ_mesure: yup.string().nullable(),
    civilite: yup.string().required(),
    code_postal: yup.string().when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().length(5).required(CODE_POSTAL_NOT_VALID),
    }),
    date_nomination: yup
      .date(FORM_DATE_NOT_VALID)
      .transform(parseDateString)
      .required(FORM_DATE_NOT_VALID)
      .typeError(FORM_DATE_NOT_VALID),

    date_premier_mesure: yup
      .date(FORM_DATE_NOT_VALID)
      .transform(parseDateStringWhenNullable)
      .nullable()
      .typeError(FORM_DATE_NOT_VALID),

    lieu_vie: yup.string().required(),
    type_etablissement: yup
      .string()
      .nullable()
      .when("lieu_vie", (lieu_vie, schema) => {
        return schema.test({
          test: (type_etablissement) =>
            !!lieu_vie &&
            lieu_vie === "etablissement" &&
            type_etablissement != null,

          message: "Veuillez choisir le type d'établissement",
        });
      }),
    nature_mesure: yup.string().required(),
    numero_dossier: yup.string(),
    numero_rg: yup
      .string()
      .required("Veuillez renseigner ce champ. \n Par exemple : 12A34567.")
      .test(
        "numero_rg-alphanum",
        MESSAGE_VALID_NUMERO_RG_ALPHANUM,
        checkNumeroRgAlphanum
      )
      .test(
        "numero_rg-length-lt",
        MESSAGE_VALID_NUMERO_RG_LENGTH_LT,
        checkNumeroRgLengthLt
      )
      .test(
        "numero_rg-length-gt",
        MESSAGE_VALID_NUMERO_RG_LENGTH_GT,
        checkNumeroRgLengthGt
      )
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
