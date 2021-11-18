import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMandataire } from "~/containers/GreffierMandataire";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Gestionnaire() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  const {
    greffier: { ti_id: tiId },
  } = useUser();

  return (
    <LayoutGreffier>
      <BoxWrapper mt={3} px="0">
        <GreffierMandataire gestionnaireId={gestionnaireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutGreffier>
  );
}

export default Gestionnaire;
