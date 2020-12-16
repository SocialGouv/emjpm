import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutServices } from "~/components/Layout";
import { ServiceCreateAntenne } from "~/components/ServiceAntenneCreate";
import { withAuthSync } from "~/util/auth";

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
