import yup from "../validationSchemas/yup";

import {
  getDepartementByCodePostal,
  codePostalExists,
} from "~/util/codePostal";

const adminServiceSchema = yup.object().shape({
  departement: yup
    .string()
    .required()
    .test(
      "departement_code_postal",
      "le département ne correspond pas au code postal",
      async function (value) {
        return (
          this.parent.lb_code_postal &&
          (await getDepartementByCodePostal(this.parent.lb_code_postal)) ==
            value
        );
      }
    ),
  email: yup.string().email(),
  etablissement: yup.string().required(),
  lb_adresse: yup.string().nullable().required(),
  lb_code_postal: yup
    .string()
    .nullable()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .required()
    .test(
      "code_postal_exists",
      "ce code postal n'existe pas",
      async (value) => {
        return value && (await codePostalExists(value));
      }
    )
    .test(
      "code_postal_departement",
      "le code postal ne correspond pas au département",
      async function (value) {
        return (
          value &&
          (await getDepartementByCodePostal(value)) == this.parent.departement
        );
      }
    ),
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
  // siret: yup
  //   .string()
  //   .matches(/^[\d]{14}$/, "Doit contenir exactement 14 chiffres")
  //   .required(),
  siren: yup
    .string()
    .matches(/^[\d]{9}$/, "Doit contenir exactement 9 chiffres")
    .required(),
  telephone: yup.string(),
});

export { adminServiceSchema };
