import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMagistrat } from "../../../../src/components/Layout";
import { MagistratMesureAdd } from "../../../../src/components/MagistratMesureAdd";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";

const Reservation = props => {
  const { gestionnaireId } = props;

  const context = useContext(UserContext);
  const {
    magistrat: { ti_id: tiId }
  } = context;
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureAdd gestionnaireId={gestionnaireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

Reservation.getInitialProps = async ({ query }) => {
  return { gestionnaireId: query.gestionnaire_id };
};

export default withAuthSync(Reservation);
