import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMandataire } from "~/containers/MagistratMandataire";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

function Gestionnaire() {
  const { gestionnaire_id } = useParams();
  const gestionnaireId = gestionnaire_id;

  const {
    magistrat: { ti_id: tiId },
  } = useUser();

  return (
    <>
      <Helmet>
        <title>Gestionnaire {gestionnaire_id} | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="reserver_mesure" />
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="0">
          <MagistratMandataire gestionnaireId={gestionnaireId} tiId={tiId} />
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default Gestionnaire;
