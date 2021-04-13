const { EnqueteReponses } = require("~/models");
const { EnqueteReponsesPopulations } = require("~/models");
const { EnqueteReponsesPrestationsSociales } = require("~/models");
const { EnqueteReponsesAgrementsFormations } = require("~/models");
const { EnqueteReponsesInformationsMandataire } = require("~/models");
const { EnqueteReponsesActivite } = require("~/models");
const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
} = require("../mandataire-individuel/requests");
const HttpError = require("~/utils/error/HttpError");

async function update(enqueteId, { tabs, mandataireId, isUpload = false }) {
  const {
    informationsMandataire,
    agrementsFormations,
    populations,
    prestationsSociales,
    activite,
  } = tabs;

  const enqueteReponse = await initEnqueteReponse({
    enqueteId,
    mandataireId,
  });

  if (isUpload && enqueteReponse.status !== "draft") {
    throw new HttpError(423, "Enquete response has already been submitted.");
  }

  if (isUpload) {
    await EnqueteReponses.query()
      .findById(enqueteReponse.id)
      .patch({ uploaded_on: new Date() });
  }

  await EnqueteReponsesInformationsMandataire.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(informationsMandataire);

  await EnqueteReponsesAgrementsFormations.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(agrementsFormations);

  await EnqueteReponsesPopulations.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(populations);

  await EnqueteReponsesPrestationsSociales.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(prestationsSociales);

  await EnqueteReponsesActivite.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(activite);
}

async function initEnqueteReponse({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId,
  });

  if (!enqueteReponse) {
    await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId,
    });
    enqueteReponse = await getEnqueteReponse({
      enqueteId,
      mandataireId,
    });
  }

  return enqueteReponse;
}

const mandataireIndividuelEnqueteRepository = {
  update,
};

module.exports = mandataireIndividuelEnqueteRepository;
