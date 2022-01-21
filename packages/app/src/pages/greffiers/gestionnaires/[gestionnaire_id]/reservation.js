import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMesureAdd } from "~/containers/GreffierMesureAdd";
import { BoxWrapper } from "~/components/Grid";

function Reservation() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  return (
    <>
      <Helmet>
        <title>Réserver une mesure | e-MJPM</title>
      </Helmet>
      <LayoutGreffier>
        <BoxWrapper mt={3} px="0">
          <GreffierMesureAdd gestionnaireId={gestionnaireId} />
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default Reservation;
