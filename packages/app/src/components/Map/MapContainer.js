import React from "react";
import ReactMapboxGl, { ScaleControl, ZoomControl } from "react-mapbox-gl";

const Map = ReactMapboxGl({ accessToken: "" });

const MapContainer = props => {
  const { children, longitude, latitude } = props;
  return (
    <Map
      style="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      center={[longitude, latitude]}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
      <ScaleControl />
      <ZoomControl />
      {children}
    </Map>
  );
};

export { MapContainer };
