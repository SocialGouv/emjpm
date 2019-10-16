import React from "react";
import { Layer, Feature } from "react-mapbox-gl";
import { useLazyQuery } from "@apollo/react-hooks";

import { MESURES_SERVICE } from "./queries";
import iconMarker from "../../../static/images/map-icon-service@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["service", image, { pixelRatio: 2 }];

const LayerServices = props => {
  const { services, setCenter, setMesures, setcurrentGestionnaire, currentGestionnaire } = props;
  const [getMesures, { data }] = useLazyQuery(MESURES_SERVICE);
  let currentServices = services;

  const chooseMandataire = service => {
    setcurrentGestionnaire({ id: service.service.id, discriminator: "SERVICE" });
    getMesures({ variables: { id: service.service.id } });
    setCenter([service.longitude, service.latitude]);
  };

  if (currentGestionnaire) {
    currentServices = services.filter(
      currentService =>
        currentService.service.id === currentGestionnaire.id &&
        currentGestionnaire.discriminator === "SERVICE"
    );
  }

  if (data && data.mesures) {
    setMesures(data.mesures);
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
      {currentServices.map(service => {
        return (
          <Feature
            onClick={() => chooseMandataire(service)}
            key={service.id}
            coordinates={[service.longitude, service.latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerServices;
