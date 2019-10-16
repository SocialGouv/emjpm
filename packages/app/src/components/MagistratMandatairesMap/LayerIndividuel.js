import React from "react";
import { Layer, Feature } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-individuel-man@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["individuel", image, { pixelRatio: 2 }];

const LayerIndividuel = props => {
  const { individuel, setCenter, currentGestionnaire } = props;

  let currentIndividuel = individuel;
  if (currentGestionnaire) {
    currentIndividuel = individuel.filter(
      currentService =>
        currentService.mandataire.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "MANDATAIRE_IND"
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
      id="individuel"
      images={images}
      layout={{ "icon-image": "individuel" }}
    >
      {currentIndividuel.map(gestionnaire => {
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

export default LayerIndividuel;
