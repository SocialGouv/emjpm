import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import React, { useContext } from "react";

import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";
import { UserContext } from "../UserContext";
import { MapContext } from "./context";
import { MESURES_GESTIONNAIRE } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

const MagistratMapMandataires = dynamic(
  () => import("./MagistratMapMandataires").then(mod => mod.MagistratMapMandataires),
  { ssr: false }
);

const MagistratMandataires = () => {
  const { currentGestionnaire } = useContext(MapContext);

  const {
    magistrat: { ti_id }
  } = useContext(UserContext);

  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRE, {
    variables: {
      tiId: ti_id
    },
    fetchPolicy: "network-only"
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
    SERVICE,
    currentGestionnaire
  );
  const individuel = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    MANDATAIRE_IND,
    currentGestionnaire
  );
  const prepose = filterGestionnairesByDiscriminator(
    mesureGestionnaires,
    MANDATAIRE_PRE,
    currentGestionnaire
  );

  return (
    <MagistratMapMandataires
      currentGestionnaire={currentGestionnaire}
      services={services}
      individuel={individuel}
      prepose={prepose}
    />
  );
};

export { MagistratMandataires };
