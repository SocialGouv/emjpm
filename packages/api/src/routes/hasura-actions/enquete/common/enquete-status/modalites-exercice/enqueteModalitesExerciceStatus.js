const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  const status = {
    informationsGenerales: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      yup.object({
        // TODO
      }),
      "modalitesExercice/informationsGenerales"
    ),
    etablissements: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      yup.object({
        // TODO
      }),
      "modalitesExercice/etablissements"
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
