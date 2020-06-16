import yup from "./yup";

const INTEGER_MSG = "doit être un entier";
const POSITIVE_MSG = "doit être positif";

const servicePersonnelSchema = yup.object().shape({
  nombreDelegues: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesCnc: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesCncDpf: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesCncMaj: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesCncPjm: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesEnFormation: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombreDeleguesNonFormes: yup.number().integer(INTEGER_MSG).positive(POSITIVE_MSG).required(),
  nombrePosteAutrePersonnelEtp: yup.number().positive(POSITIVE_MSG).required(),
  nombrePostesDeleguesEtp: yup.number().positive(POSITIVE_MSG).required(),
});

export { servicePersonnelSchema };
