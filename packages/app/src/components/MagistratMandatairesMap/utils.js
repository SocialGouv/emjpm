import { SERVICE } from "../../constants/discriminator";

const formatGestionnaires = (gestionnaires) => {
  return gestionnaires.map((gestionnaire) => {
    const id = gestionnaire.id;
    const latitude =
      gestionnaire.discriminator === SERVICE
        ? gestionnaire.service.latitude || 2.3488
        : gestionnaire.mandataire.latitude || 48.8534;
    const longitude =
      gestionnaire.discriminator === SERVICE
        ? gestionnaire.service.longitude || 2.3488
        : gestionnaire.mandataire.longitude || 48.8534;
    return {
      discriminator: gestionnaire.discriminator,
      id,
      latitude,
      longitude,
    };
  });
};

// TODO Optimize that function duplication in memory
const filterGestionnairesByDiscriminator = (gestionnaires, discriminator) => {
  const formatedGestionnaires = formatGestionnaires(gestionnaires);
  return formatedGestionnaires.filter(
    (gestionnaire) => gestionnaire.discriminator === discriminator
  );
};

export { formatGestionnaires, filterGestionnairesByDiscriminator };
