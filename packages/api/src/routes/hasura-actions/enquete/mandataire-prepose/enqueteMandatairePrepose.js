const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteMandatairePreposeStatus = require("./enqueteMandatairePreposeStatus");
const logger = require("~/utils/logger");
const HttpError = require("~/utils/error/HttpError");

async function initEnqueteMandatairePrepose({
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, mandataireId },
}) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId,
  });

  if (!enqueteReponse) {
    logger.warn(
      `EnqueteReponse does not exists for enqueteId ${enqueteId} and mandataireId ${mandataireId}: create it`
    );
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId,
    });

    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);
  return {
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponse_validation_status: status,
    mandataire: enqueteReponse.mandataire,
    status: enqueteReponse.status,
    submitted_at: enqueteReponse.submitted_at,
    user_type: enqueteReponse.user_type,
  };
}

async function submitEnqueteMandatairePrepose({
  enqueteContext: { enqueteId, mandataireId },
}) {
  const enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId: mandataireId,
  });

  if (enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);

  if (status.global === "invalid") {
    throw new HttpError(400, "Enquete response is invalid");
  }

  return await submitEnqueteReponse(enqueteReponse.id);
}

module.exports = {
  initEnqueteMandatairePrepose,
  submitEnqueteMandatairePrepose,
};
