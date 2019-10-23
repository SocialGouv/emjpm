import { useLazyQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Feature, Layer } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-service@2x.png";
import { MapContext } from "./context";
import { MESURES_SERVICE } from "./queries";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["service", image, { pixelRatio: 2 }];

const LayerServices = props => {
  const { services } = props;
  const { setCenter, setMesures, setcurrentGestionnaire, currentGestionnaire } = useContext(
    MapContext
  );
  const [getMesures, { data }] = useLazyQuery(MESURES_SERVICE);
  let currentServices = services;

  const chooseMandataire = service => {
    // Should move that when data are fetched so it will be less laggy
    setcurrentGestionnaire({
      id: service.service.id,
      discriminator: "SERVICE",
      coordinates: [service.service.longitude, service.service.latitude]
    });
    getMesures({ variables: { id: service.service.id } });
  };

  if (currentGestionnaire) {
    currentServices = services.filter(
      currentService =>
        currentService.service.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "SERVICE"
    );
  }

  if (data && data.mesures) {
    setTimeout(function() {
      setCenter(currentGestionnaire.coordinates);
      setMesures(data.mesures);
    }, 100);
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
      id="service"
      images={images}
      layout={{ "icon-image": "service" }}
    >
      {currentServices.map(gestionnaire => {
        return (
          <Feature
            onClick={() => chooseMandataire(gestionnaire)}
            key={gestionnaire.id}
            coordinates={[gestionnaire.service.longitude, gestionnaire.service.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerServices;
