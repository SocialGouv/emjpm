import { useQuery } from "@apollo/react-hooks";
import React, { useContext, useMemo } from "react";

import { MapCluster, MapContainer } from "../Map";
import { UserContext } from "../UserContext";
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
            longitude: mesure.longitude,
            latitude: mesure.latitude,
            isSelected: selectedMesuresIds.includes(mesure.id),
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
