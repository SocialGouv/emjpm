import { useQuery } from "@apollo/client";
import { useContext, useMemo } from "react";

import { MapCluster, MapContainer } from "~/components/Map";
import { UserContext } from "~/components/UserContext";

import { MESURES } from "./queries";

function MandataireMap({ selectMesures, selectedMesuresIds }) {
  const {
    mandataire: { longitude, latitude },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(MESURES);

  const mesuresMarkers = useMemo(
    () =>
      !data
        ? []
        : data.mesures.map((mesure) => ({
            id: mesure.id,
            isSelected: selectedMesuresIds.includes(mesure.id),
            latitude: mesure.latitude,
            longitude: mesure.longitude,
          })),
    [data, selectedMesuresIds]
  );

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapCluster
        items={mesuresMarkers}
        onMarkerClick={(marker) => selectMesures([marker.id])}
        onClusterClick={(markers) => selectMesures(markers.map(({ id }) => id))}
        type="MESURE"
      />
    </MapContainer>
  );
}

export { MandataireMap };
