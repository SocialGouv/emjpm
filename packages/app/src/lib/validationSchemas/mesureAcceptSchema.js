import { isTypeEtablissementRequired } from "@emjpm/core";

import yup from "./yup";

const mesureAcceptSchema = yup.object().shape({
  antenne: yup.string().nullable(),
  code_postal: yup.string().when("pays", {
    is: (pays) => pays === "FR",
    then: yup.string().length(5).required(),
  }),
  date_nomination: yup.date().required(),
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
