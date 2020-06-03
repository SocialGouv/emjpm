const {
  getEnqueteReponse,
  createEmptyEnqueteReponse,
  submitEnqueteReponse
} = require("./requests");
const enqueteMandataireIndividuelStatus = require("../mandataire-individuel-status");

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

  const validations = {
    enquete_reponses_status: 0,
    enquete_reponses_informations_mandataire_generales_status: 0,
    enquete_reponses_informations_mandataire_formation_status: 0,
    enquete_reponses_informations_mandataire_agrements_status: 0,
    enquete_reponses_prestations_sociale_status: 0,

    enquete_reponses_populations_curatelle_status: 0,
    enquete_reponses_populations_tutelle_status: 0,
    enquete_reponses_populations_accompagnement_judiciaire_status: 0,
    enquete_reponses_populations_sauvegarde_justice_status: 0,
    enquete_reponses_populations_autre_status: 0
  };

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId
    });
    enqueteReponse = insert_enquete_reponses_one;
    const status = await enqueteMandataireIndividuelStatus(enqueteReponse);

    console.log("xxx xxxxxxxxxx status", status);

    validations.enquete_reponses_status = status;
  } else {
    const {
      informationsGeneralesMandataireStatus,
      informationsFormationMandataireStatus,
      informationsAgrementsMandataireStatus,
      prestationsSocialesStatus,
      populationsCuratelleStatus,
      populationsTutelleStatus,
      populationsAccompagnementJudiciaireStatus,
      populationsSauvegardeJusticeStatus,
      populationsAutreStatus,
      activite
    } = await enqueteMandataireIndividuelStatus(enqueteReponse);
    console.log("xxx xxxxxxxxxx activite", activite);

    validations.enquete_reponses_status = {
      activite
    };
    validations.enquete_reponses_informations_mandataire_generales_status = informationsGeneralesMandataireStatus;
    validations.enquete_reponses_informations_mandataire_formation_status = informationsFormationMandataireStatus;
    validations.enquete_reponses_informations_mandataire_agrements_status = informationsAgrementsMandataireStatus;
    validations.enquete_reponses_prestations_sociale_status = prestationsSocialesStatus;
    validations.enquete_reponses_populations_curatelle_status = populationsCuratelleStatus;
    validations.enquete_reponses_populations_tutelle_status = populationsTutelleStatus;
    validations.enquete_reponses_populations_accompagnement_judiciaire_status = populationsAccompagnementJudiciaireStatus;
    validations.enquete_reponses_populations_sauvegarde_justice_status = populationsSauvegardeJusticeStatus;
    validations.enquete_reponses_populations_autre_status = populationsAutreStatus;
  }

  return {
    ...validations,
    submitted_at: enqueteReponse.submitted_at,
    enquete_id: enqueteReponse.enquete_id,
    enquete_reponses_id: enqueteReponse.id,
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
