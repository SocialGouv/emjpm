import yup from "../validationSchemas/yup";

const adminServiceSchema = yup.object().shape({
  departement: yup.string().required(),
  email: yup.string().email(),
  etablissement: yup.string().required(),
  lb_adresse: yup.string().nullable().required(),
  lb_code_postal: yup
    .string()
    .nullable()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .required(),
  lb_ville: yup.string().nullable().required(),
  org_adresse: yup.string().nullable().when("org_gestionnaire", {
    is: true,
    then: yup.string().required(),
  }),
  org_code_postal: yup
    .string()
    .nullable()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .when("org_gestionnaire", {
      is: true,
      then: yup.string().required(),
    }),
  org_gestionnaire: yup.boolean().nullable().required(),
  org_nom: yup.string().nullable().when("org_gestionnaire", {
    is: true,
    then: yup.string().required(),
  }),
  org_ville: yup.string().nullable().when("org_gestionnaire", {
    is: true,
    then: yup.string().required(),
  }),
  siret: yup
    .string()
    .matches(/^[\d]{14}$/, "Doit contenir exactement 14 chiffres")
    .required(),
  telephone: yup.string(),
});

export { adminServiceSchema };
