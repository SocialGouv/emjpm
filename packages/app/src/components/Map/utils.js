import iconIndividuelMarker from "../../../public/static/images/map-icon-individuel-man@2x.png";
import iconMesureMarker from "../../../public/static/images/map-icon-mesure@2x.png";
import iconPreposeMarker from "../../../public/static/images/map-icon-propose-man@2x.png";
import iconServiceMarker from "../../../public/static/images/map-icon-service@2x.png";
import { MANDATAIRE_IND, MANDATAIRE_PRE, MESURE, SERVICE } from "./constants";

const iconsSrc = [
  { src: iconIndividuelMarker, name: MANDATAIRE_IND },
  { src: iconPreposeMarker, name: MANDATAIRE_PRE },
  { src: iconServiceMarker, name: SERVICE },
  { src: iconMesureMarker, name: MESURE },
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
  SERVICE: iconService,
  MESURE: mesure,
};
