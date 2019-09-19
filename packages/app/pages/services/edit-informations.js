import React from "react";
import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";

import { withAuthSync } from "../../src/util/auth";
import { LayoutServices } from "../../src/components-v2/Layout";

const EditInformations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Heading1>Page en construction</Heading1>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(EditInformations);
