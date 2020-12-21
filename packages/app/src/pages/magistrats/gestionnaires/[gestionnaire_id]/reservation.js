import React from "react";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesureAdd } from "~/components/MagistratMesureAdd";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

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
