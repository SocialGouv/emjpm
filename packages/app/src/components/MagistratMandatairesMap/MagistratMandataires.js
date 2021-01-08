import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { UserContext } from "~/components/UserContext";
import {
  MANDATAIRE_IND,
  MANDATAIRE_PRE,
  SERVICE,
} from "~/constants/discriminator";

import { MESURES_GESTIONNAIRES } from "./queries";
import { filterGestionnairesByDiscriminator } from "./utils";

import { MagistratMandatairesMap } from "./MagistratMandatairesMap";

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
    <MagistratMandatairesMap
      magistrat={magistrat}
      services={services}
      individuel={individuel}
      prepose={prepose}
    />
  );
};

export { MagistratMandataires };
