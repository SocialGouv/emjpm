import yup from "./yup";
import {
  validateNumeroRG,
  MESSAGE_VALID_NUMERO_RG,
} from "~/utils/data/numero-rg";

const magistratMandataireSchema = yup.object().shape({
  annee_naissance: yup.string().required(),
  cabinet: yup.string().nullable(),
  champ_mesure: yup.string().nullable(),
  civilite: yup.string().required(),
  judgmentDate: yup.date(),
  nature_mesure: yup.string().required(),
  numero_rg: yup
    .string()
    .required()
    .test("numero_rg-check", MESSAGE_VALID_NUMERO_RG, validateNumeroRG),
  urgent: yup.boolean().nullable(),
  antenne: yup.number().integer().nullable(),
});

export { magistratMandataireSchema };
