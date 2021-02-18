import React from "react";

import { ErrorBoundary } from "react-error-boundary";
import { captureException } from "~/user/sentry";

const ScaleControl = React.lazy(() => import("./Lazy/ScaleControl"));
const ZoomControl = React.lazy(() => import("./Lazy/ZoomControl"));

import { MapError } from "./MapError";
import { Map } from "./Map";
import { MapFallback } from "./MapFallback";

function MapContainer(props) {
  const { children, latitude, longitude } = props;

  if (!latitude || !longitude) {
    return <MapError />;
  }

  return (
    <ErrorBoundary onError={captureException} FallbackComponent={MapFallback}>
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
    </ErrorBoundary>
  );
}

export { MapContainer };
