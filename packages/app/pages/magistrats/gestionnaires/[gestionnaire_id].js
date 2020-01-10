import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";

import { LayoutMagistrat } from "../../../src/components/Layout";
import { MagistratMandataire } from "../../../src/components/MagistratMandataire";
import { MagistratMesureMandataireContent } from "../../../src/components/MagistratMesureMandataire";
import { UserContext } from "../../../src/components/UserContext";
import { withAuthSync } from "../../../src/util/auth";
import { formatGestionnaireId } from "../../../src/util/mandataires";

const Gestionnaire = props => {
  const { gestionnaireId } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);
  const {
    magistrat: { ti_id: tiId }
  } = useContext(UserContext);

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureMandataireContent
          serviceId={serviceId}
          mandataireId={mandataireId}
          tiId={tiId}
        />
        <MagistratMandataire serviceId={serviceId} mandataireId={mandataireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

Gestionnaire.getInitialProps = async ({ query }) => {
  return { gestionnaireId: query.gestionnaire_id };
};

export default withAuthSync(Gestionnaire);
