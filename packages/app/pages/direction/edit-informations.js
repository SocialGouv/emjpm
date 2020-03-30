import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { DirectionEditInformations } from "../../src/components/DirectionEditInformations";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Heading1>Editer mes informations</Heading1>
        <DirectionEditInformations mt="3" />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EditInformations);
