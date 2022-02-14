import yup, { FORM_DATE_NOT_VALID, CODE_POSTAL_NOT_VALID } from "./yup";

const mesureEtatSchema = yup.object().shape({
  champ_mesure: yup.string().nullable(),
  code_postal: yup
    .string()
    .when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().length(5).required(CODE_POSTAL_NOT_VALID).nullable(),
    })
    .nullable(),
  date_changement_etat: yup
    .date(FORM_DATE_NOT_VALID)
    .required(FORM_DATE_NOT_VALID),
  lieu_vie: yup.string().required(),
  nature_mesure: yup.string().required(),
  pays: yup.string().nullable().required(),
  ville: yup
    .string()
    .nullable()
    .when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().required().nullable(),
    }),
});

export { mesureEtatSchema };
