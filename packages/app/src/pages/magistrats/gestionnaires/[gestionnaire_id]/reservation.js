import React from "react";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesureAdd } from "~/components/MagistratMesureAdd";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const Reservation = () => {
  const { gestionnaire_id: gestionnaireId } = useQuery();

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMesureAdd gestionnaireId={gestionnaireId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default Reservation;
