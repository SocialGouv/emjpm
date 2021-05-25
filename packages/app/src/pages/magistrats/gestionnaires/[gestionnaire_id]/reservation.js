import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesureAdd } from "~/containers/MagistratMesureAdd";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Reservation() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={3} px="0">
        <MagistratMesureAdd gestionnaireId={gestionnaireId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default Reservation;
