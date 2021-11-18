import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMesureAdd } from "~/containers/GreffierMesureAdd";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Reservation() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  return (
    <LayoutGreffier>
      <BoxWrapper mt={3} px="0">
        <GreffierMesureAdd gestionnaireId={gestionnaireId} />
      </BoxWrapper>
    </LayoutGreffier>
  );
}

export default Reservation;
