const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
  submitEnqueteReponse
} = require("./requests");
const enqueteMandataireIndividuelStatus = require("./enqueteMandataireIndividuelStatus");

async function submitEnqueteMandataireIndividuel(id) {
  // TODO(remiroyc): check if all form sections are valids

  const enqueteReponse = await submitEnqueteReponse(id);
  return enqueteReponse;
}

async function initEnqueteMandataireIndividuel({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponse({
    enqueteId,
    mandataireId
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId
    });
    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteMandataireIndividuelStatus(enqueteReponse);
  return {
    submitted_at: enqueteReponse.submitted_at,
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponses_id: enqueteReponse.id,
    enquete_reponses_status: status,
    enquete_reponses_informations_mandataire_id:
      enqueteReponse.enquete_reponses_informations_mandataire_id,
    enquete_reponses_prestations_sociale_id:
      enqueteReponse.enquete_reponses_prestations_sociale_id,
    enquete_reponses_agrements_formations_id:
      enqueteReponse.enquete_reponses_agrements_formations_id,
    enquete_reponses_activite_id: enqueteReponse.enquete_reponses_activite_id,
    enquete_reponses_populations_id:
      enqueteReponse.enquete_reponses_populations_id
  };
}

module.exports = {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel
};
