import React from "react";
import { Layer, Feature } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-propose-man@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["prepose", image, { pixelRatio: 2 }];

const LayerPrepose = props => {
  const { prepose, setCenter, currentGestionnaire } = props;
  let currentPrepose = prepose;
  if (currentGestionnaire) {
    currentPrepose = prepose.filter(
      currentService =>
        currentService.mandataire.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "MANDATAIRE_PRE"
    );
  }

  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id="propose"
      images={images}
      layout={{ "icon-image": "prepose" }}
    >
      {currentPrepose.map(gestionnaire => {
        return (
          <Feature
            onClick={() => setCenter([gestionnaire.longitude, gestionnaire.latitude])}
            key={gestionnaire.id}
            coordinates={[gestionnaire.longitude, gestionnaire.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerPrepose;
