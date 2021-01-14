import { useContext } from "react";
import ReactMapboxGl from "react-mapbox-gl";

import { MapLayer, MapPopup } from "~/components/Map";
import { MapContext } from "~/components/Map/context";
import { mapImages } from "~/components/Map/utils";
import {
  MANDATAIRE_IND,
  MANDATAIRE_PRE,
  SERVICE,
} from "~/constants/discriminator";

import { MagistratMandatairesMapPopup } from "./MagistratMandatairesMapPopup";

const Map = ReactMapboxGl({ accessToken: "" });

function MagistratMandatairesMap(props) {
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
          <MagistratMandatairesMapPopup />
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

export { MagistratMandatairesMap };
