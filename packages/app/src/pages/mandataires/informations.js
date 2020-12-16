import { BoxWrapper, Card } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireInformations } from "~/components/MandataireInformations";
import { withAuthSync } from "~/util/auth";

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
