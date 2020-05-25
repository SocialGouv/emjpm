const {
  informationsGeneralesMandataireSchema,
  informationsAgrementsMandataireSchema,
  informationsFormationMandataireSchema,
  prestationsSocialesSchema,
  activiteSchema,
  populationsSchema
} = require("./schemas");

async function getValidationStatus(data, validationSchema) {
  if (!data) {
    return 0;
  }
  const isValid = await validationSchema.isValid(data);
  return isValid === true ? 2 : 1;
}

async function enqueteMandataireIndividuelStatus(enqueteReponse) {
  const informationsGeneralesMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_informations_mandataire,
    informationsGeneralesMandataireSchema
  );

  const informationsFormationMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_agrements_formation,
    informationsAgrementsMandataireSchema
  );

  const informationsAgrementsMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_agrements_formation,
    informationsFormationMandataireSchema
  );

  // TODO
  const activiteCuratelleRenforceeStatus = 0;
  const activiteCuratelleSimpleStatus = 0;
  const activiteTutelleStatus = 0;
  const activiteAccompagnementJudiciaireStatus = 0;
  const activiteCuratelleBiensStatus = 0;
  const activiteCuratellePersonneStatus = 0;
  const activiteRevisionMesuresStatus = 0;

  const prestationsSocialesStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_prestations_sociale,
    prestationsSocialesSchema
  );

  const activiteStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_activite,
    activiteSchema
  );

  const populationsCuratelleStatus = 0;
  const populationsTutelleStatus = 0;
  const populationsAccompagnementJudiciaireStatus = 0;
  const populationsSauvegardeJusticeStatus = 0;
  const populationsAutreStatus = 0;

  return {
    informationsGeneralesMandataireStatus,
    informationsFormationMandataireStatus,
    informationsAgrementsMandataireStatus,
    activiteCuratelleRenforceeStatus,
    activiteCuratelleSimpleStatus,
    activiteTutelleStatus,
    activiteAccompagnementJudiciaireStatus,
    activiteCuratelleBiensStatus,
    activiteCuratellePersonneStatus,
    activiteRevisionMesuresStatus,
    prestationsSocialesStatus,
    activiteStatus,
    populationsCuratelleStatus,
    populationsTutelleStatus,
    populationsAccompagnementJudiciaireStatus,
    populationsSauvegardeJusticeStatus,
    populationsAutreStatus
  };
}

module.exports = enqueteMandataireIndividuelStatus;
