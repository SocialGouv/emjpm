import yup, { FORM_YEAR_NOT_VALID, FORM_DATE_NOT_VALID } from "./yup";
import {
  validateNumeroRG,
  checkNumeroRgAlphanum,
  checkNumeroRgLengthLt,
  checkNumeroRgLengthGt,
  MESSAGE_VALID_NUMERO_RG_ALPHANUM,
  MESSAGE_VALID_NUMERO_RG_LENGTH_LT,
  MESSAGE_VALID_NUMERO_RG_LENGTH_GT,
  MESSAGE_DUPLICATE_NUMERO_RG_TI,
} from "~/utils/data/numero-rg";
import {
  checkDuplicateNumeroRGByMandataireId,
  checkDuplicateNumeroRGByServiceId,
} from "~/query-service/emjpm-hasura/checkDuplicateNumeroRG";

const greffierMandataireSchema = ({ apolloClient, serviceId, mandataireId }) =>
  yup.object().shape({
    annee_naissance: yup.string().required(FORM_YEAR_NOT_VALID),
    cabinet: yup.string().nullable(),
    champ_mesure: yup.string().nullable(),
    civilite: yup.string().required(),
    judgmentDate: yup.date(FORM_DATE_NOT_VALID),
    nature_mesure: yup.string().required(),
    numero_rg: yup
      .string()
      .required("Veuillez renseigner ce champ. \n Par exemple : 12A34567")
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
      .test("numero_rg-duplicate", MESSAGE_DUPLICATE_NUMERO_RG_TI, (value) => {
        if (!validateNumeroRG(value)) {
          return true;
        }
        if (serviceId) {
          return checkDuplicateNumeroRGByServiceId(
            apolloClient,
            value,
            serviceId
          );
        } else {
          return checkDuplicateNumeroRGByMandataireId(
            apolloClient,
            value,
            mandataireId
          );
        }
      }),
    urgent: yup.boolean().nullable(),
    antenne: yup.number().integer().nullable(),
  });

export { greffierMandataireSchema };
