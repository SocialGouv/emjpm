import yup, {
  FORM_DATE_NOT_VALID,
  CODE_POSTAL_NOT_VALID,
  parseDateString,
} from "./yup";

const mesureEtatSchema = (mesure) =>
  yup.object().shape({
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
      .min(
        mesure.dateNomination,
        "la date de changement d'état doit être ultérieure à la date de nomination "
      )
      .transform(parseDateString)
      .required(FORM_DATE_NOT_VALID)
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
