import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesureAdd } from "~/components/MagistratMesureAdd";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function Reservation() {
  const { gestionnaire_id: gestionnaireId } = useParams();

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureAdd gestionnaireId={gestionnaireId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default Reservation;
