import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

import LayerMandataires from "./LayerMandataires";
const Map = ReactMapboxGl({ accessToken: "" });
import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";
import { mapMarkers } from "./utils";

const MagistratMapMandataires = props => {
  const { services, individuel, prepose, magistrat } = props;
  const {
    ti: { latitude, longitude }
  } = magistrat;
  const [iconIndividuel, iconPrepose, iconService] = mapMarkers();

  return (
    <Map
      style="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      center={[longitude, latitude]}
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
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
