function formatGestionnaires(gestionnaires) {
  return gestionnaires.map((gestionnaire) => {
    const id = gestionnaire.id;
    const latitude =
      gestionnaire.user_type === "service"
        ? gestionnaire.service.latitude || 2.3488
        : gestionnaire.mandataire.latitude || 48.8534;
    const longitude =
      gestionnaire.user_type === "service"
        ? gestionnaire.service.longitude || 2.3488
        : gestionnaire.mandataire.longitude || 48.8534;
    return {
      user_type: gestionnaire.user_type,
      id,
      latitude,
      longitude,
    };
  });
}

// TODO Optimize that function duplication in memory
function filterGestionnairesByDiscriminator(gestionnaires, user_type) {
  const formatedGestionnaires = formatGestionnaires(gestionnaires);
  return formatedGestionnaires.filter(
    (gestionnaire) => gestionnaire.user_type === user_type
  );
}

export { formatGestionnaires, filterGestionnairesByDiscriminator };
