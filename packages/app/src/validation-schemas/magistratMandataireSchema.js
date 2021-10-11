import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
  MESSAGE_DUPLICATE_NUMERO_RG_TI,
} from "~/utils/data/numero-rg";
import {
  checkDuplicateNumeroRGByMandataireId,
  checkDuplicateNumeroRGByServiceId,
} from "~/query-service/emjpm-hasura/checkDuplicateNumeroRG";

const magistratMandataireSchema = ({ apolloClient, serviceId, mandataireId }) =>
  yup.object().shape({
    annee_naissance: yup.string().required(),
    cabinet: yup.string().nullable(),
    champ_mesure: yup.string().nullable(),
    civilite: yup.string().required(),
    judgmentDate: yup.date(),
    nature_mesure: yup.string().required(),
    numero_rg: yup
      .string()
      .required()
      .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, validateNumeroRG)
      .test(
        "numero_rg-duplicate",
        MESSAGE_DUPLICATE_NUMERO_RG_TI,
        (value, { parent }) => {
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
        }
      ),
    urgent: yup.boolean().nullable(),
    antenne: yup.number().integer().nullable(),
  });

export { magistratMandataireSchema };
