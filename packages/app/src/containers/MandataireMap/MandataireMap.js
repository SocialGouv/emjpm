import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { MapCluster, MapContainer } from "~/containers/Map";
import useUser from "~/hooks/useUser";

import { MESURES } from "./queries";

function MandataireMap({ selectMesures, selectedMesuresIds }) {
  const {
    mandataire: { longitude, latitude },
  } = useUser();

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

  if (!useQueryReady(loading, error)) {
    return null;
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
