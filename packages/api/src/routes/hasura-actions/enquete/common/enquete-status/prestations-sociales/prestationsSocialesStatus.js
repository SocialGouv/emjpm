const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse =>
  await getValidationStatus(
    enqueteReponse.enquete_reponses_prestations_sociale,
    {
      schema: yup.object({
        // TODO
      }),
      debugName: `prestationsSociales`,
      logDataWithErrors: false
    }
  );
