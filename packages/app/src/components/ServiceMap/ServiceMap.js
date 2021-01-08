import { useQuery } from "@apollo/client";
import { useContext, useMemo } from "react";

import { MapCluster, MapContainer } from "~/components/Map";
import { UserContext } from "~/components/UserContext";

import { MESURES_SERVICE } from "./queries";

const ServiceMap = ({ selectMesures, selectedMesuresIds }) => {
  const { service_members } = useContext(UserContext);
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
};

export { ServiceMap };
