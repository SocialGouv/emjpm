import React, { useContext } from "react";
import { Feature, Layer } from "react-mapbox-gl";

import { MapContext } from "./context";

const LayerMandataires = props => {
  const { gestionnaires, discriminator, images } = props;
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
      images={images}
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
