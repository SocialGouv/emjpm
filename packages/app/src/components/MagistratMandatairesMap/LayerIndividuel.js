import { useLazyQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Feature, Layer } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-individuel-man@2x.png";
import { MapContext } from "./context";
import { MESURES_MANDATAIRE } from "./queries";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["individuel", image, { pixelRatio: 2 }];

const LayerIndividuel = props => {
  const { individuel } = props;
  const { currentGestionnaire, setCenter, setMesures, setcurrentGestionnaire } = useContext(
    MapContext
  );
  const [getMesures, { data }] = useLazyQuery(MESURES_MANDATAIRE);

  let currentIndividuel = individuel;

  const chooseMandataire = prepose => {
    // Should move that when data are fetched so it will be less laggy
    setcurrentGestionnaire({
      id: prepose.mandataire.id,
      discriminator: "SERVICE",
      coordinates: [prepose.longitude, prepose.latitude]
    });
    getMesures({ variables: { id: prepose.mandataire.id } });
  };

  if (currentGestionnaire) {
    currentIndividuel = individuel.filter(currentService => {
      if (currentGestionnaire.discriminator === "MANDATAIRE_IND") {
        return null;
      }
      return currentService.mandataire.id === currentGestionnaire.id;
    });
  }

  if (data && data.mesures) {
    setTimeout(function() {
      setCenter(currentGestionnaire.coordinates);
      setMesures(data.mesures);
    }, 300);
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
            onClick={() => chooseMandataire(gestionnaire)}
            key={gestionnaire.id}
            coordinates={[gestionnaire.longitude, gestionnaire.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerIndividuel;
