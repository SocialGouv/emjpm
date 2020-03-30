import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutMagistrat } from "../../src/components/Layout";
import { MagistratEditInformations } from "../../src/components/MagistratEditInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Editer mes informations</Heading1>
        <MagistratEditInformations mt="3" />
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(EditInformations);
