import iconIndividuelMarker from "~public/images/map-icon-individuel-unknow@2x.png";
import iconIndividuelHMarker from "~public/images/map-icon-individuel-man@2x.png";
import iconIndividuelFMarker from "~public/images/map-icon-individuel-woman@2x.png";
import iconPreposeMarker from "~public/images/map-icon-prepose-unknow@2x.png";
import iconPreposeHMarker from "~public/images/map-icon-prepose-man@2x.png";
import iconPreposeFMarker from "~public/images/map-icon-prepose-woman@2x.png";
import iconServiceMarker from "~public/images/map-icon-service@2x.png";

export const markers = {
  MANDATAIRE_PRE: iconPreposeMarker,
  MANDATAIRE_PRE_H: iconPreposeHMarker,
  MANDATAIRE_PRE_F: iconPreposeFMarker,
  MANDATAIRE_IND: iconIndividuelMarker,
  MANDATAIRE_IND_H: iconIndividuelHMarker,
  MANDATAIRE_IND_F: iconIndividuelFMarker,
  SERVICE: iconServiceMarker,
};

export const mapImages = Object.entries(markers).reduce((acc, [name, src]) => {
  const image = new Image(60, 72);
  image.src = src;
  acc[name] = [name, image, { pixelRatio: 2 }];
  return acc;
}, {});
