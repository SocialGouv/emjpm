import React, { useContext } from "react";
import { Feature, Layer } from "react-mapbox-gl";

import iconIndividuelMarker from "../../../static/images/map-icon-individuel-man@2x.png";
import iconPreposeMarker from "../../../static/images/map-icon-propose-man@2x.png";
import iconServiceMarker from "../../../static/images/map-icon-service@2x.png";
import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";
import { MapContext } from "./context";
// TODO MOVE EVERYTHING IN THE MAP FOLDER
const icons = [
  { src: iconIndividuelMarker, name: MANDATAIRE_IND },
  { src: iconPreposeMarker, name: MANDATAIRE_PRE },
  { src: iconServiceMarker, name: SERVICE }
];

const mapBoxImages = () => {
  return icons.map(icon => {
    const image = new Image(60, 72);
    image.src = icon.src;
    return [icon.name, image, { pixelRatio: 2 }];
  });
};

const LayerMandataires = props => {
  const { gestionnaires, discriminator } = props;
  const { setcurrentGestionnaire } = useContext(MapContext);
  const chooseMandataire = (id, latitude, longitude, discriminator) => {
    setcurrentGestionnaire({
      isActive: true,
      latitude: latitude,
      longitude: longitude,
      currentId: id,
      currentDiscriminator: discriminator
    });
  };

  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id={discriminator}
      images={mapBoxImages()}
      layout={{ "icon-image": discriminator }}
    >
      {gestionnaires.map(gestionnaire => {
        const { id, discriminator, longitude, latitude } = gestionnaire;
        return (
          <Feature
            onClick={() => chooseMandataire(id, latitude, longitude, discriminator)}
            key={id}
            coordinates={[longitude, latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerMandataires;
