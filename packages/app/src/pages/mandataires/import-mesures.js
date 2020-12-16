import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureImport } from "~/components/MandataireMesureImport";
import { UserContext } from "~/components/UserContext";
import { withAuthSync } from "~/util/auth";

const ImportMesures = () => {
  const user = useContext(UserContext);
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <MandataireMesureImport mandataireUserId={user.id} />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(ImportMesures);
