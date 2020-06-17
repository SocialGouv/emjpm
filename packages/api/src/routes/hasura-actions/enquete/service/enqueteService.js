const {
  getEnqueteReponseService,
  createEmptyEnqueteReponse,
  submitEnqueteReponse,
} = require("./requests");
const enqueteServiceStatus = require("./enqueteServiceStatus");
const logger = require("../../../../utils/logger");

async function initEnqueteService(context) {
  const { enqueteId, service } = context;

  let enqueteReponse = await getEnqueteReponseService({
    enqueteId,
    serviceId: service.id,
  });

  if (!enqueteReponse) {
    logger.warn(
      `EnqueteReponse does not exists for enqueteId ${enqueteId} and serviceId ${service.id}: create it`
    );
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      serviceId: service.id,
    });

    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteServiceStatus(enqueteReponse);

  const ids = {
    id: enqueteReponse.id,
    modalites_exercice_id:
      enqueteReponse.enquete_reponses_modalites_exercice_id,
    populations_id: enqueteReponse.enquete_reponses_populations_id,
    financement_id: enqueteReponse.enquete_reponses_financement_id,
    activite_id: enqueteReponse.enquete_reponses_activite_id,
    personel_formation_id:
      enqueteReponse.enquete_reponses_prepose_personel_formation_id,
    prestations_sociales_id:
      enqueteReponse.enquete_reponses_prepose_prestations_sociales_id,
  };
  return {
    enquete_id: enqueteReponse.enquete_id,
    submitted_at: enqueteReponse.submitted_at,
    enquete_reponse_status: status,
    enquete_reponse_ids: ids,
  };
}

async function submitEnqueteService(id) {
  // TODO(remiroyc): check if all form sections are valids

  const enqueteReponse = await submitEnqueteReponse(id);
  return enqueteReponse;
}

module.exports = {
  initEnqueteService,
  submitEnqueteService,
};
