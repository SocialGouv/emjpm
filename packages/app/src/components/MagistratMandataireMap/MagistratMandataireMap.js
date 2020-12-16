import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { formatGestionnaireId } from "~/util/mandataires";

import { MagistratMandataireMapContent } from "./MagistratMandataireMapContent";
import { MESURES } from "./queries";

const MagistratMandataireMap = (props) => {
  const { latitude, longitude, id, discriminator } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(id);
  const { data, loading, error } = useQuery(MESURES, {
    variables: {
      mandataireId: mandataireId,
      serviceId: serviceId,
    },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  const { mesures } = data;
  return (
    <MagistratMandataireMapContent
      mesures={mesures}
      latitude={latitude}
      longitude={longitude}
      id={id}
      discriminator={discriminator}
    />
  );
};

export { MagistratMandataireMap };
