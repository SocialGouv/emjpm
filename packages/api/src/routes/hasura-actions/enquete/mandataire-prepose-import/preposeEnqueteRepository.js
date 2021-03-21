const { EnqueteReponses } = require("~/models");
const { EnqueteReponsesPopulations } = require("~/models");
const { EnqueteReponsesModalitesExercice } = require("~/models");
const { EnqueteReponsesPreposePersonnelFormation } = require("~/models");
const { EnqueteReponsesPreposePrestationsSociales } = require("~/models");
const { EnqueteReponsesFinancement } = require("~/models");
const { EnqueteReponsesActivite } = require("~/models");

const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse,
} = require("../mandataire-prepose/requests");
const HttpError = require("~/utils/error/HttpError");

async function update(enqueteId, { tabs, mandataireId, isUpload = false }) {
  const {
    populations,
    modaliteExercice,
    preposePersonnelFormation,
    prestationsSociales,
    financement,
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

  await EnqueteReponsesPopulations.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(populations);

  await EnqueteReponsesModalitesExercice.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(modaliteExercice);

  await EnqueteReponsesPreposePersonnelFormation.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(preposePersonnelFormation);

  await EnqueteReponsesActivite.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(activite);

  await EnqueteReponsesPreposePrestationsSociales.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(prestationsSociales);

  await EnqueteReponsesFinancement.query()
    .findOne("enquete_reponses_id", enqueteReponse.id)
    .patch(financement);
}

async function initEnqueteReponse({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId,
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId,
    });
    enqueteReponse = insert_enquete_reponses_one;
  }
  return enqueteReponse;
}

const preposeEnqueteRepository = {
  update,
};

module.exports = preposeEnqueteRepository;
