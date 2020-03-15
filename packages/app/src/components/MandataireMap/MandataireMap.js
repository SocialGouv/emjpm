import { useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext } from "react";

import { MapContainer, MapLayer } from "../Map";
import { mapImages } from "../Map/utils";
import { UserContext } from "../UserContext";
import { MESURES } from "./queries";

const MandataireMap = () => {
  const {
    mandataire: { longitude, latitude }
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(MESURES);

  const selectMesure = ({ id }) => {
    Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${id}`, {
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

export { MandataireMap };
