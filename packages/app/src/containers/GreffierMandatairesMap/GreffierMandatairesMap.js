import { useContext } from "react";

import { MapLayer, MapPopup } from "~/containers/Map";
import { Map } from "~/containers/Map/Map";
import { MapContext } from "~/containers/Map/context";
import { mapImages } from "~/containers/Map/utils";
import {
  MANDATAIRE_IND,
  MANDATAIRE_PRE,
  SERVICE,
} from "~/constants/discriminator";

import { GreffierMandatairesMapPopup } from "./GreffierMandatairesMapPopup";

function GreffierMandatairesMap(props) {
  const { services, individuel, prepose } = props;

  const { currentMarker, setCurrentMarker } = useContext(MapContext);
  const { latitude, longitude } = currentMarker;

  function selectMarker(clickedMarker) {
    setCurrentMarker({ ...clickedMarker, isActive: true });
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
      {currentMarker.isActive && (
        <MapPopup longitude={longitude} latitude={latitude}>
          <GreffierMandatairesMapPopup />
        </MapPopup>
      )}
      <MapLayer
        items={individuel}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages[MANDATAIRE_IND]}
        type={MANDATAIRE_IND}
      />
      <MapLayer
        items={prepose}
        image={mapImages[MANDATAIRE_PRE]}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        type={MANDATAIRE_PRE}
      />
      <MapLayer
        items={services}
        image={mapImages[SERVICE]}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        type={SERVICE}
      />
    </Map>
  );
}

export { GreffierMandatairesMap };
