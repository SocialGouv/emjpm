import React from "react";

import { MapContainer, MapLayer } from "../Map";
import { mapImages } from "../Map/utils";

const MagistratMandataireMapContent = props => {
  const { latitude, longitude, id, discriminator, mesures } = props;
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapLayer image={mapImages["MESURE"]} items={mesures} type={"MESURE"} />
      <MapLayer
        image={mapImages[discriminator]}
        items={[{ id, latitude, longitude }]}
        type={discriminator}
      />
    </MapContainer>
  );
};

export { MagistratMandataireMapContent };
