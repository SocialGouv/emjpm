import React from "react";

const ScaleControl = React.lazy(() => import("./Lazy/ScaleControl"));
const ZoomControl = React.lazy(() => import("./Lazy/ZoomControl"));

import { MapError } from "./MapError";
import { Map } from "./Map";

function MapContainer(props) {
  const { children, latitude, longitude } = props;

  if (!latitude || !longitude) {
    return <MapError />;
  }

  return (
    <Map
      style="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      center={[longitude, latitude]}
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <ScaleControl />
      <ZoomControl />
      {children}
    </Map>
  );
}

export { MapContainer };
