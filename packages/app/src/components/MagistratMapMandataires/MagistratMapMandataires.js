import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";

import LayerMandataires from "./LayerMandataires";
import LayerMesures from "./LayerMesures";
const Map = ReactMapboxGl({ accessToken: "" });
import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";
import { MESURES, MESURES_MANDATAIRE, MESURES_SERVICE } from "./queries";
import { mapMarkers } from "./utils";

const QUERY_TYPE = {
  MANDATAIRE_IND: MESURES_MANDATAIRE,
  MANDATAIRE_PRE: MESURES_MANDATAIRE,
  SERVICE: MESURES_SERVICE,
  DEFAULT: MESURES
};

const MagistratMapMandataires = props => {
  const {
    services,
    individuel,
    prepose,
    currentGestionnaire: { longitude, latitude, isActive, currentDiscriminator, currentId }
  } = props;

  const [iconIndividuel, iconPrepose, iconService] = mapMarkers();
  const [mesures, setMesures] = useState([]);
  const [loadMesures, { called, loading, data }] = useLazyQuery(
    currentDiscriminator ? QUERY_TYPE[currentDiscriminator] : QUERY_TYPE["DEFAULT"],
    {
      variables: {
        id: currentId
      }
    }
  );

  useEffect(() => {
    if (isActive && !called) {
      loadMesures();
    }
  }, [called, isActive, loadMesures]);

  useEffect(() => {
    if (called && !loading) {
      setMesures(data.mesures);
    } else if (!isActive) {
      setMesures([]);
    }
  }, [called, data, isActive, loading, setMesures]);

  return (
    <Map
      style="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      center={[longitude, latitude]}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
      <LayerMesures mesures={mesures} />
      <LayerMandataires
        gestionnaires={individuel}
        images={iconIndividuel}
        discriminator={MANDATAIRE_IND}
      />
      <LayerMandataires
        gestionnaires={prepose}
        images={iconPrepose}
        discriminator={MANDATAIRE_PRE}
      />
      <LayerMandataires gestionnaires={services} images={iconService} discriminator={SERVICE} />
    </Map>
  );
};

export { MagistratMapMandataires };
