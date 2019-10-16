import getConfig from "next/config";
import React, { useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";

import LayerIndividuel from "./LayerIndividuel";
import LayerMesures from "./LayerMesures";
import LayerPrepose from "./LayerPrepose";
import LayerServices from "./LayerServices";

const Map = ReactMapboxGl({ accessToken: "" });

const MagistratMandatairesMap = props => {
  const { view_mesure_gestionnaire } = props;
  const [center, setCenter] = useState([2.3488, 48.8534]);
  const [mesures, setMesures] = useState([]);
  const [currentGestionnaire, setcurrentGestionnaire] = useState(false);

  const services = view_mesure_gestionnaire.filter(
    gestionnaire => gestionnaire.discriminator === "SERVICE"
  );
  const individuel = view_mesure_gestionnaire.filter(
    gestionnaire => gestionnaire.discriminator === "MANDATAIRE_IND"
  );
  const prepose = view_mesure_gestionnaire.filter(
    gestionnaire => gestionnaire.discriminator === "MANDATAIRE_PRE"
  );

  return (
    <Map
      style="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      center={center}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
      <LayerMesures mesures={mesures} />
      <LayerIndividuel
        currentGestionnaire={currentGestionnaire}
        setCenter={setCenter}
        individuel={individuel}
      />
      <LayerPrepose
        currentGestionnaire={currentGestionnaire}
        setCenter={setCenter}
        prepose={prepose}
      />
      <LayerServices
        currentGestionnaire={currentGestionnaire}
        setcurrentGestionnaire={setcurrentGestionnaire}
        setCenter={setCenter}
        setMesures={setMesures}
        services={services}
      />
    </Map>
  );
};

export { MagistratMandatairesMap };
