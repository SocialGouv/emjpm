import iconIndividuelMarker from "../../../static/images/map-icon-individuel-man@2x.png";
import iconPreposeMarker from "../../../static/images/map-icon-propose-man@2x.png";
import iconServiceMarker from "../../../static/images/map-icon-service@2x.png";
import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";

const icons = [
  { src: iconIndividuelMarker, name: MANDATAIRE_IND },
  { src: iconPreposeMarker, name: MANDATAIRE_PRE },
  { src: iconServiceMarker, name: SERVICE }
];

export const mapMarkers = () => {
  return icons.map(icon => {
    const image = new Image(60, 72);
    image.src = icon.src;
    return [icon.name, image, { pixelRatio: 2 }];
  });
};

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
