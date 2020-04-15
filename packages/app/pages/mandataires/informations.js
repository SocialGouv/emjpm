import { BoxWrapper, Card } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireInformations } from "../../src/components/MandataireInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => (
  <LayoutMandataire>
    <BoxWrapper mt={6} px="1">
      <Card p="5">
        <MandataireInformations />
      </Card>
    </BoxWrapper>
  </LayoutMandataire>
);

export default withAuthSync(Informations);
