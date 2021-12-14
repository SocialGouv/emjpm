import { useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { MESURES_GESTIONNAIRES } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

import { MagistratMandatairesMap } from "./MagistratMandatairesMap";

function MagistratMandataires() {
  const { magistrat } = useUser();
  const {
    ti_id,
    ti: { departement_code: departementCode },
  } = magistrat;

  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRES, {
    fetchPolicy: "network-only",
    variables: {
      tiId: ti_id,
      departementCode,
    },
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const mesureGestionnaires = data.view_lb_tis;

  const services = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    "service"
  );
  const individuel = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    "individuel"
  );
  const prepose = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    "prepose"
  );

  return (
    <MagistratMandatairesMap
      magistrat={magistrat}
      services={services}
      individuel={individuel}
      prepose={prepose}
    />
  );
}

export { MagistratMandataires };
