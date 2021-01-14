import ReactMapboxGl, { ScaleControl, ZoomControl } from "react-mapbox-gl";

import { MapError } from "./MapError";

const Map = ReactMapboxGl({ accessToken: "" });

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
