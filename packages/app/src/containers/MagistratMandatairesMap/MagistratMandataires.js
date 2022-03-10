import { useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { MESURES_GESTIONNAIRES } from "./queries";

import { MagistratMandatairesMap } from "./MagistratMandatairesMap";

function MagistratMandataires() {
  const { magistrat, greffier } = useUser();
  const {
    ti_id,
    ti: { departement_code: departementCode },
  } = magistrat || greffier;

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

  return <MagistratMandatairesMap mesureGestionnaires={mesureGestionnaires} />;
}

export { MagistratMandataires };
