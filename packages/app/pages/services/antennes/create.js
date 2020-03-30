import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutServices } from "../../../src/components/Layout";
import { ServiceCreateAntenne } from "../../../src/components/ServiceAntenneCreate";
import { withAuthSync } from "../../../src/util/auth";

const AddAntennes = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Créer une antenne pour votre service</Heading1>
        <ServiceCreateAntenne />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
