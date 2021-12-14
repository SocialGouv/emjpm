import { useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { MESURES_GESTIONNAIRES } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

import { GreffierMandatairesMap } from "./GreffierMandatairesMap";

function GreffierMandataires() {
  const { greffier } = useUser();
  const {
    ti_id,
    ti: { departement_code: departementCode },
  } = greffier;

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
    <GreffierMandatairesMap
      greffier={greffier}
      services={services}
      individuel={individuel}
      prepose={prepose}
    />
  );
}

export { GreffierMandataires };
