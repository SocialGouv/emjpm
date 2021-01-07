import React, { useContext } from "react";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMandataire } from "~/components/MagistratMandataire";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const Gestionnaire = () => {
  const { gestionnaire_id: gestionnaireId } = useParams();
  const {
    magistrat: { ti_id: tiId },
  } = useContext(UserContext);

  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <MagistratMandataire gestionnaireId={gestionnaireId} tiId={tiId} />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default Gestionnaire;
