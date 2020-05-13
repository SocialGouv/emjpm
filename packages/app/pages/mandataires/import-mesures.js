import { BoxWrapper } from "@emjpm/ui";
import React, { useContext } from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireMesureImport } from "../../src/components/MandataireMesureImport";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

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
