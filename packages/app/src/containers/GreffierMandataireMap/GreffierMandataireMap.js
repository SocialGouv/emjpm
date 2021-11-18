import { useQuery } from "@apollo/client";

import useQueryReady from "~/hooks/useQueryReady";
import { formatGestionnaireId } from "~/formatters/mandataires";

import { GreffierMandataireMapContent } from "./GreffierMandataireMapContent";
import { MESURES } from "./queries";

function GreffierMandataireMap(props) {
  const { latitude, longitude, id, discriminator } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(id);
  const { data, loading, error } = useQuery(MESURES, {
    variables: {
      mandataireId: mandataireId,
      serviceId: serviceId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }
  const { mesures } = data;
  return (
    <GreffierMandataireMapContent
      mesures={mesures}
      latitude={latitude}
      longitude={longitude}
      id={id}
      discriminator={discriminator}
    />
  );
}

export { GreffierMandataireMap };
