const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteMandataireIndividuelStatus = require("./enqueteMandataireIndividuelStatus");
const logger = require("../../../../utils/logger");
const HttpError = require("../../../../utils/error/HttpError");

async function submitEnqueteMandataireIndividuel({
  enqueteContext: { enqueteId, mandataireId },
}) {
  const enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId,
  });
  if (enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }
  const status = await enqueteMandataireIndividuelStatus(enqueteReponse);

  if (status.global === "invalid") {
    throw new HttpError(400, "Enquete response is invalid");
  }

  return await submitEnqueteReponse(enqueteReponse.id);
}

async function initEnqueteMandataireIndividuel({
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, mandataireId },
}) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId: mandataireId,
  });

  if (!enqueteReponse) {
    logger.warn(
      `EnqueteReponse does not exists for enqueteId ${enqueteId} and mandataireId ${mandataireId}: create it`
    );
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId: mandataireId,
    });
    enqueteReponse = insert_enquete_reponses_one;
  }

  const status = await enqueteMandataireIndividuelStatus(enqueteReponse);
  const ids = {
    activite_id: enqueteReponse.enquete_reponses_activite_id,
    agrements_formations_id:
      enqueteReponse.enquete_reponses_agrements_formations_id,
    id: enqueteReponse.id,
    informations_mandataire_id:
      enqueteReponse.enquete_reponses_informations_mandataire_id,
    populations_id: enqueteReponse.enquete_reponses_populations_id,
    prestations_sociale_id:
      enqueteReponse.enquete_reponses_prestations_sociale_id,
  };

  return {
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponse_ids: ids,
    enquete_reponse_validation_status: status,
    mandataire: enqueteReponse.mandataire,
    status: enqueteReponse.status,
    submitted_at: enqueteReponse.submitted_at,
    user_type: enqueteReponse.user_type,
  };
}

module.exports = {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel,
};
