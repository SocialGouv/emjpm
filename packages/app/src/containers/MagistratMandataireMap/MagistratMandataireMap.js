import { useQuery } from "@apollo/client";

import { formatGestionnaireId } from "~/util/mandataires";

import { MagistratMandataireMapContent } from "./MagistratMandataireMapContent";
import { MESURES } from "./queries";

function MagistratMandataireMap(props) {
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
}

export { MagistratMandataireMap };
