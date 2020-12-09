import yup from "./yup";

const mesureEtatSchema = yup.object().shape({
  champ_mesure: yup.string().nullable(),
  code_postal: yup
    .string()
    .nullable()
    .when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().length(5).required(),
    }),
  date_changement_etat: yup.date().required(),
  lieu_vie: yup.string().required(),
  nature_mesure: yup.string().required(),
  pays: yup.string().nullable().required(),
  ville: yup
    .string()
    .nullable()
    .when("pays", {
      is: (pays) => pays === "FR",
      then: yup.string().required(),
    }),
});

export { mesureEtatSchema };
