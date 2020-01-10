import React from "react";

import { MapContainer, MapLayer } from "../Map";
import { mapImages } from "../Map/utils";

const MagistratMesureMandataireMap = props => {
  const { latitude, longitude, id, discriminator } = props;
  console.log(latitude, longitude, id, discriminator);
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapLayer image={mapImages["MESURE"]} items={[{ id, latitude, longitude }]} type={"MESURE"} />
      <MapLayer
        image={mapImages[discriminator]}
        items={[{ id, latitude, longitude }]}
        type={discriminator}
      />
    </MapContainer>
  );
};

export { MagistratMesureMandataireMap };
