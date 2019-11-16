import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutMandataire } from "../../src/components-v2/Layout";
import { MandataireMesureImport } from "../../src/components-v2/MandataireMesureImport";
import { withAuthSync } from "../../src/util/auth";

const ImportMesures = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <MandataireMesureImport />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(ImportMesures);
