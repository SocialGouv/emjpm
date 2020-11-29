import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceEdit } from "../../src/components/ServiceEdit";
import { withAuthSync } from "../../src/util/auth";

const AddAntennes = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Editer les informations de votre service</Heading1>
        <ServiceEdit mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
