const {
  getEnqueteReponse,
  createEmptyEnqueteReponse
} = require("../../../graphql/enquete");
const enqueteMandataireIndividuelStatus = require("./enqueteMandataireIndividuelStatus");

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

  const {
    informationsGeneralesMandataireStatus,
    informationsFormationMandataireStatus,
    informationsAgrementsMandataireStatus,
    prestationsSocialesStatus,
    agrementsFormationsStatus,
    activiteStatus,
    populationsStatus
  } = await enqueteMandataireIndividuelStatus(enqueteReponse);

  return {
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponses_id: enqueteReponse.id,
    enquete_reponses_informations_mandataire_id:
      enqueteReponse.enquete_reponses_informations_mandataire_id,

    enquete_reponses_informations_mandataire_generales_status: informationsGeneralesMandataireStatus,
    enquete_reponses_informations_mandataire_agrements_status: informationsAgrementsMandataireStatus,
    enquete_reponses_informations_mandataire_formation_status: informationsFormationMandataireStatus,

    enquete_reponses_prestations_sociale_id:
      enqueteReponse.enquete_reponses_prestations_sociale_id,
    enquete_reponses_prestations_sociale_status: prestationsSocialesStatus,
    enquete_reponses_agrements_formations_id:
      enqueteReponse.enquete_reponses_agrements_formations_id,
    enquete_reponses_agrements_formations_status: agrementsFormationsStatus,
    enquete_reponses_activite_id: enqueteReponse.enquete_reponses_activite_id,
    enquete_reponses_activite_status: activiteStatus,
    enquete_reponses_populations_id:
      enqueteReponse.enquete_reponses_populations_id,
    enquete_reponses_populations_status: populationsStatus
  };
}

module.exports = { initEnqueteMandataireIndividuel };
