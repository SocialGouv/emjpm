import iconIndividuelMarker from "~public/images/map-icon-individuel-man@2x.png";
import iconMesureMarker from "~public/images/map-icon-mesure@2x.png";
import iconPreposeMarker from "~public/images/map-icon-propose-man@2x.png";
import iconServiceMarker from "~public/images/map-icon-service@2x.png";

import { MANDATAIRE_IND, MANDATAIRE_PRE, MESURE, SERVICE } from "./constants";

const iconsSrc = [
  { name: MANDATAIRE_IND, src: iconIndividuelMarker },
  { name: MANDATAIRE_PRE, src: iconPreposeMarker },
  { name: SERVICE, src: iconServiceMarker },
  { name: MESURE, src: iconMesureMarker },
];

export const mapMarkersIcons = () => {
  return iconsSrc.map((icon) => {
    const image = new Image(60, 72);
    image.src = icon.src;
    return [icon.name, image, { pixelRatio: 2 }];
  });
};

const [iconIndividuel, iconPrepose, iconService, mesure] = mapMarkersIcons();

export const mapImages = {
  MANDATAIRE_IND: iconIndividuel,
  MANDATAIRE_PRE: iconPrepose,
  MESURE: mesure,
  SERVICE: iconService,
};
