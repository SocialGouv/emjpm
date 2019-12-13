const formatGestionnaires = gestionnaires => {
  return gestionnaires.map(gestionnaire => {
    const id =
      gestionnaire.discriminator === "SERVICE"
        ? gestionnaire.service.id || 2.3488
        : gestionnaire.mandataire.id || 48.8534;
    const latitude =
      gestionnaire.discriminator === "SERVICE"
        ? gestionnaire.service.latitude || 2.3488
        : gestionnaire.mandataire.latitude || 48.8534;
    const longitude =
      gestionnaire.discriminator === "SERVICE"
        ? gestionnaire.service.longitude || 2.3488
        : gestionnaire.mandataire.longitude || 48.8534;
    return {
      id,
      latitude,
      longitude,
      discriminator: gestionnaire.discriminator
    };
  });
};

const filterGestionnaires = (gestionnaires, currentId, currentDiscriminator) =>
  gestionnaires.filter(gestionnaire => {
    return gestionnaire.id === currentId && gestionnaire.discriminator === currentDiscriminator;
  });

// TODO Optimize that function duplication in memory
const filterGestionnairesByDiscriminator = (gestionnaires, discriminator, currentGestionnaire) => {
  const { isActive, currentId, currentDiscriminator } = currentGestionnaire;
  const formatedGestionnaires = formatGestionnaires(gestionnaires);
  const filteredGestionnaires = isActive
    ? filterGestionnaires(formatedGestionnaires, currentId, currentDiscriminator)
    : formatedGestionnaires;

  return filteredGestionnaires.filter(gestionnaire => gestionnaire.discriminator === discriminator);
};

export { formatGestionnaires, filterGestionnaires, filterGestionnairesByDiscriminator };
