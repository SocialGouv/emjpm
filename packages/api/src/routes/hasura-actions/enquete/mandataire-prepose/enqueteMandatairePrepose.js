const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse
} = require("./requests");
const enqueteMandatairePreposeStatus = require("./enqueteMandatairePreposeStatus");

async function initEnqueteMandatairePrepose({ enqueteId, mandataireId }) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
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
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);

  return {
    enquete_reponses_status: status,
    enquete_id: enqueteReponse.enquete_id,
    submitted_at: enqueteReponse.submitted_at,
    enquete_reponses_id: enqueteReponse.id,
    enquete_reponses_modalites_exercice_id:
      enqueteReponse.enquete_reponses_modalites_exercice_id,
    enquete_reponses_modalites_exercice_status: 0,
    enquete_reponses_populations_id:
      enqueteReponse.enquete_reponses_populations_id,
    enquete_reponses_populations_curatelle_status: 0,
    enquete_reponses_populations_tutelle_status: 0,
    enquete_reponses_populations_accompagnement_judiciaire_status: 0,
    enquete_reponses_populations_sauvegarde_justice_status: 0,
    enquete_reponses_populations_autre_status: 0,
    enquete_reponses_financement_id:
      enqueteReponse.enquete_reponses_financement_id
  };
}

module.exports = { initEnqueteMandatairePrepose };
