import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import React, { useContext } from "react";

import { MANDATAIRE_IND, MANDATAIRE_PRE, SERVICE } from "../../constants/discriminator";
import { UserContext } from "../UserContext";
import { MESURES_GESTIONNAIRES } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

const MagistratMapMandataires = dynamic(
  () => import("./MagistratMandatairesMap").then((mod) => mod.MagistratMapMandataires),
  { ssr: false }
);

const MagistratMandataires = () => {
  const { magistrat } = useContext(UserContext);
  const { ti_id } = magistrat;

  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRES, {
    variables: {
      tiId: ti_id,
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const mesureGestionnaires = data.view_mesure_gestionnaire;

  const services = filterGestionnairesByDiscriminator(mesureGestionnaires, SERVICE);
  const individuel = filterGestionnairesByDiscriminator(mesureGestionnaires, MANDATAIRE_IND);
  const prepose = filterGestionnairesByDiscriminator(mesureGestionnaires, MANDATAIRE_PRE);

  return (
    <MagistratMapMandataires
      magistrat={magistrat}
      services={services}
      individuel={individuel}
      prepose={prepose}
    />
  );
};

export { MagistratMandataires };
