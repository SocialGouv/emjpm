const { EnqueteReponses } = require("~/models");
const { EnqueteReponsesActivite } = require("~/models");
const { EnqueteReponsesPopulations } = require("~/models");
const { EnqueteReponsesServiceInformations } = require("~/models");
const { EnqueteReponsesServicePersonnelFormation } = require("~/models");

const {
  getEnqueteReponseService,
  createEmptyEnqueteReponse,
} = require("../service/requests");
const HttpError = require("~/utils/error/HttpError");

async function update(enqueteId, { tabs, serviceId, isUpload = false }) {
  const { activite, populations, informations, personnelFormation } = tabs;

  const enqueteReponse = await initEnqueteReponse({
    enqueteId,
    serviceId,
  });

  if (isUpload && enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }

  if (isUpload) {
    await EnqueteReponses.query()
      .findById(enqueteReponse.id)
      .patch({ uploaded_on: new Date() });
  }

  await EnqueteReponsesServicePersonnelFormation.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(personnelFormation);

  await EnqueteReponsesServiceInformations.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(informations);

  await EnqueteReponsesPopulations.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(populations);

  await EnqueteReponsesActivite.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(activite);
}

async function initEnqueteReponse({ enqueteId, serviceId }) {
  let enqueteReponse = await getEnqueteReponseService({
    enqueteId,
    serviceId,
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      serviceId,
    });
    enqueteReponse = insert_enquete_reponses_one;
  }
  return enqueteReponse;
}

module.exports = {
  update,
};
