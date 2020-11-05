import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireEditInformations } from "../../src/components/MandataireEditInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper px="1">
        <MandataireEditInformations mt="3" />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(EditInformations);
