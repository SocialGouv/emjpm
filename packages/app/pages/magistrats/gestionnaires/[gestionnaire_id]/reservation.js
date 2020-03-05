import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";

import { LayoutMagistrat } from "../../../../src/components/Layout";
import { MagistratMesureAdd } from "../../../../src/components/MagistratMesureAdd";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";
import { formatGestionnaireId } from "../../../../src/util/mandataires";

const Reservation = props => {
  const { gestionnaireId } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);
  const context = useContext(UserContext);
  const {
    magistrat: { ti_id: tiId }
  } = context;
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureAdd serviceId={serviceId} mandataireId={mandataireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

Reservation.getInitialProps = async ({ query }) => {
  return { gestionnaireId: query.gestionnaire_id };
};

export default withAuthSync(Reservation);
