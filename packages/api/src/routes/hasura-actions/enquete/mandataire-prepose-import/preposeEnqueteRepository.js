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
    .findById(enqueteReponse.enquete_reponses_populations_id)
    .patch(populations);

  await EnqueteReponsesModalitesExercice.query()
    .findById(enqueteReponse.enquete_reponses_modalites_exercice_id)
    .patch(modaliteExercice);

  await EnqueteReponsesPreposePersonnelFormation.query()
    .findById(enqueteReponse.enquete_reponses_prepose_personel_formation_id)
    .patch(preposePersonnelFormation);

  await EnqueteReponsesActivite.query()
    .findById(enqueteReponse.enquete_reponses_activite_id)
    .patch(activite);

  await EnqueteReponsesPreposePrestationsSociales.query()
    .findById(enqueteReponse.enquete_reponses_prepose_prestations_sociales_id)
    .patch(prestationsSociales);

  await EnqueteReponsesFinancement.query()
    .findById(enqueteReponse.enquete_reponses_financement_id)
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
