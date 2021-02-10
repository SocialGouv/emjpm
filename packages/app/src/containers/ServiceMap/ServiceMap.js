import { useQuery } from "@apollo/client";
import { useContext, useMemo } from "react";

import useQueryReady from "~/hooks/useQueryReady";

import { MapCluster, MapContainer } from "~/containers/Map";
import useUser from "~/hooks/useUser";

import { MESURES_SERVICE } from "./queries";

function ServiceMap({ selectMesures, selectedMesuresIds }) {
  const { service_members } = useUser();
  const [service_member] = service_members;
  const {
    service: { longitude, latitude },
  } = service_member;

  const { data, loading, error } = useQuery(MESURES_SERVICE);

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

export { ServiceMap };
