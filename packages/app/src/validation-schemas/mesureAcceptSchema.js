import { isTypeEtablissementRequired } from "@emjpm/biz";

import yup, {
  CODE_POSTAL_NOT_VALID,
  FORM_DATE_NOT_VALID,
  parseDateString,
} from "./yup";

const mesureAcceptSchema = yup.object().shape({
  antenne: yup.string().nullable(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(CODE_POSTAL_NOT_VALID),
  }),
  date_nomination: yup
    .date(FORM_DATE_NOT_VALID)
    .transform(parseDateString)
    .required(FORM_DATE_NOT_VALID)
    .typeError(FORM_DATE_NOT_VALID),

  lieu_vie: yup.string().required(),
  pays: yup.string().required(),
  type_etablissement: yup
    .string()
    .nullable()
    .when("lieu_vie", {
      is: (lieu_vie) => isTypeEtablissementRequired(lieu_vie),
      then: yup.string().nullable().required(),
    }),
  ville: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().required(),
  }),
});

export { mesureAcceptSchema };
