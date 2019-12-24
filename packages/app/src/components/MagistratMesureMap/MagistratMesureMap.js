import React from "react";

import { MapContainer, MapLayer } from "../Map";

const MagistratMesureMap = props => {
  const { latitude, longitude, id } = props;

  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapLayer markers={[{ id, latitude, longitude }]} type="mesure" />
    </MapContainer>
  );
};

export { MagistratMesureMap };
