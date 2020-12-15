import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMandataire } from "~/components/MagistratMandataire";
import { UserContext } from "~/components/UserContext";
import { withAuthSync } from "~/util/auth";

const Gestionnaire = (props) => {
  const { gestionnaireId } = props;
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

Gestionnaire.getInitialProps = async ({ query }) => {
  return { gestionnaireId: query.gestionnaire_id };
};

export default withAuthSync(Gestionnaire);
