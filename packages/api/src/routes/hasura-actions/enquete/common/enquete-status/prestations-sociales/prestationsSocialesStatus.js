const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse =>
  await getValidationStatus(
    enqueteReponse.enquete_reponses_prestations_sociale,
    yup.object({}),
    "prestationsSociales"
  );
