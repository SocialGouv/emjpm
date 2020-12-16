const {
  getEnqueteReponseService,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteServiceStatus = require("./enqueteServiceStatus");
const logger = require("~/utils/logger");
const HttpError = require("~/utils/error/HttpError");

async function initEnqueteService(context) {
  const { enqueteId, serviceId } = context;

  let enqueteReponse = await getEnqueteReponseService({
    enqueteId,
    serviceId,
  });

  if (!enqueteReponse) {
    logger.warn(
      `EnqueteReponse does not exists for enqueteId ${enqueteId} and serviceId ${serviceId}: create it`
    );
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      serviceId,
    });

    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteServiceStatus(enqueteReponse);

  const ids = {
    activite_id: enqueteReponse.enquete_reponses_activite_id,
    id: enqueteReponse.id,
    personnel_formation_id:
      enqueteReponse.enquete_reponses_service_personnel_formation_id,
    populations_id: enqueteReponse.enquete_reponses_populations_id,
    service_informations_id:
      enqueteReponse.enquete_reponses_service_informations_id,
  };

  return {
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponse_ids: ids,
    enquete_reponse_validation_status: status,
    service: enqueteReponse.service,
    status: enqueteReponse.status || {},
    submitted_at: enqueteReponse.submitted_at,
    user_type: enqueteReponse.user_type,
  };
}

async function submitEnqueteService({
  enqueteContext: { enqueteId, serviceId },
}) {
  const enqueteReponse = await getEnqueteReponseService({
    enqueteId,
    serviceId,
  });

  if (enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }
  const status = await enqueteServiceStatus(enqueteReponse);

  if (status.global === "invalid") {
    throw new HttpError(400, "Enquete response is invalid");
  }

  return await submitEnqueteReponse(enqueteReponse.id);
}

module.exports = {
  initEnqueteService,
  submitEnqueteService,
};
