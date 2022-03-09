import { useContext, useMemo } from "react";

import { MapLayer, MapPopup } from "~/containers/Map";
import { Map } from "~/containers/Map/Map";
import { MapContext } from "~/containers/Map/context";
import { mapImages } from "~/containers/Map/utils";

import { MagistratMandatairesMapPopup } from "./MagistratMandatairesMapPopup";

function formatGestionnaires(gestionnaires) {
  return gestionnaires.map((gestionnaire) => {
    const { id } = gestionnaire;
    const latitude =
      gestionnaire.user_type === "service"
        ? gestionnaire.service.latitude || 2.3488
        : gestionnaire.mandataire.latitude || 48.8534;
    const longitude =
      gestionnaire.user_type === "service"
        ? gestionnaire.service.longitude || 2.3488
        : gestionnaire.mandataire.longitude || 48.8534;
    return {
      user_type: gestionnaire.user_type,
      id,
      latitude,
      longitude,
      genre: gestionnaire.mandataire?.user.genre,
    };
  });
}

function MagistratMandatairesMap(props) {
  const { mesureGestionnaires } = props;
  const gestionnaires = useMemo(() => {
    const gestionnaires = formatGestionnaires(mesureGestionnaires);
    const individuel = [];
    const individuel_f = [];
    const individuel_h = [];
    const prepose = [];
    const prepose_f = [];
    const prepose_h = [];
    const service = [];
    for (const gestionnaire of gestionnaires) {
      const { user_type: type, genre } = gestionnaire;
      if (type === "service") {
        service.push(gestionnaire);
      } else if (type === "individuel") {
        if (genre === "F") {
          individuel_f.push(gestionnaire);
        } else if (genre === "H") {
          individuel_h.push(gestionnaire);
        } else {
          individuel.push(gestionnaire);
        }
      } else if (type === "prepose") {
        if (genre === "F") {
          prepose_f.push(gestionnaire);
        } else if (genre === "H") {
          prepose_h.push(gestionnaire);
        } else {
          prepose.push(gestionnaire);
        }
      }
    }

    return {
      individuel,
      individuel_f,
      individuel_h,
      prepose,
      prepose_f,
      prepose_h,
      service,
    };
  }, [mesureGestionnaires]);

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
        items={gestionnaires.individuel_h}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_IND_H"]}
        type={"MANDATAIRE_IND_H"}
      />
      <MapLayer
        items={gestionnaires.individuel_f}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_IND_F"]}
        type={"MANDATAIRE_IND_F"}
      />
      <MapLayer
        items={gestionnaires.individuel}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_IND"]}
        type={"MANDATAIRE_IND"}
      />
      <MapLayer
        items={gestionnaires.prepose_h}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_PRE_H"]}
        type={"MANDATAIRE_PRE_H"}
      />
      <MapLayer
        items={gestionnaires.prepose_f}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_PRE_F"]}
        type={"MANDATAIRE_PRE_F"}
      />
      <MapLayer
        items={gestionnaires.prepose}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["MANDATAIRE_PRE"]}
        type={"MANDATAIRE_PRE"}
      />
      <MapLayer
        items={gestionnaires.service}
        onMarkerClick={(currentMarker) => selectMarker(currentMarker)}
        image={mapImages["SERVICE"]}
        type={"SERVICE"}
      />
    </Map>
  );
}

export { MagistratMandatairesMap };
