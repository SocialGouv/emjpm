import { useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext } from "react";

import { MapContainer, MapLayer } from "../Map";
import { mapImages } from "../Map/utils";
import { UserContext } from "../UserContext";
import { MESURES_SERVICE } from "./queries";

const ServiceMap = () => {
  const { service_members } = useContext(UserContext);
  const [service_member] = service_members;
  const {
    service: { longitude, latitude }
  } = service_member;

  const { data, loading, error } = useQuery(MESURES_SERVICE);

  const selectMesure = ({ id }) => {
    Router.push("/services/mesures/[mesure_id]", `/services/mesures/${id}`, {
      shallow: true
    });
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { mesures: mesuresMarkers } = data;
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapLayer
        items={mesuresMarkers}
        image={mapImages["MESURE"]}
        onMarkerClick={data => selectMesure(data)}
        type="MESURE"
      />
    </MapContainer>
  );
};

export { ServiceMap };
