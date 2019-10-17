import React, { useContext } from "react";
import ReactMapboxGl from "react-mapbox-gl";

import { MapContext } from "./context";
import LayerIndividuel from "./LayerIndividuel";
import LayerMesures from "./LayerMesures";
const Map = ReactMapboxGl({ accessToken: "" });

const MagistratMandatairesMap = props => {
  const { view_mesure_gestionnaire } = props;
  const { mesures, center } = useContext(MapContext);

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
      <LayerIndividuel individuel={individuel} />
      <LayerPrepose prepose={prepose} />
      <LayerServices services={services} />
    </Map>
  );
};

export { MagistratMandatairesMap };
