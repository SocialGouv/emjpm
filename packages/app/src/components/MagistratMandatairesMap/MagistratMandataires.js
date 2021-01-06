import { useQuery } from "@apollo/client";
import React, { lazy, Suspense, useContext } from "react";

import { UserContext } from "~/components/UserContext";
import {
  MANDATAIRE_IND,
  MANDATAIRE_PRE,
  SERVICE,
} from "~/constants/discriminator";

import { MESURES_GESTIONNAIRES } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

const MagistratMapMandataires = lazy(() =>
  import("./MagistratMandatairesMap").then((mod) => mod.MagistratMandatairesMap)
);

const MagistratMandataires = () => {
  const { magistrat } = useContext(UserContext);
  const { ti_id } = magistrat;

  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRES, {
    fetchPolicy: "network-only",
    variables: {
      tiId: ti_id,
    },
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const mesureGestionnaires = data.view_mesure_gestionnaire;

  const services = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    SERVICE
  );
  const individuel = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    MANDATAIRE_IND
  );
  const prepose = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    MANDATAIRE_PRE
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MagistratMapMandataires
        magistrat={magistrat}
        services={services}
        individuel={individuel}
        prepose={prepose}
      />
    </Suspense>
  );
};

export { MagistratMandataires };
