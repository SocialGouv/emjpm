import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesureImport } from "../../src/components-v2/ServiceMesureImport";
import { withAuthSync } from "../../src/util/auth";

const ImportMesures = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <ServiceMesureImport />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(ImportMesures);
