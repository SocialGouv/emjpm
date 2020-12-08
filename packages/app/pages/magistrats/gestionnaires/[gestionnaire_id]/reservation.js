import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { LayoutMagistrat } from "../../../../src/components/Layout";
import { MagistratMesureAdd } from "../../../../src/components/MagistratMesureAdd";
import { withAuthSync } from "../../../../src/util/auth";

const Reservation = (props) => {
  const { gestionnaireId } = props;

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureAdd gestionnaireId={gestionnaireId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

Reservation.getInitialProps = async ({ query }) => {
  return { gestionnaireId: query.gestionnaire_id };
};

export default withAuthSync(Reservation);
