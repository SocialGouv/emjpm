const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteMandataireIndividuelStatus = require("./enqueteMandataireIndividuelStatus");
const logger = require("~/utils/logger");
const HttpError = require("~/utils/error/HttpError");

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
    const { insert_enquete_reponses } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId: mandataireId,
    });
    enqueteReponse = insert_enquete_reponses.returning;
  }

  const status = await enqueteMandataireIndividuelStatus(enqueteReponse);
  return {
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponse_validation_status: status,
    id: enqueteReponse.id,
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
