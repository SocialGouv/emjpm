import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutServices } from "../../../src/components-v2/Layout";
import { ServiceCreateAntenne } from "../../../src/components-v2/ServiceCreateAntenne";
import { UserInformations } from "../../../src/components-v2/UserInformations";
import { withAuthSync } from "../../../src/util/auth";

const AddAntennes = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Créer une antenne pour votre service</Heading1>
        <UserInformations Component={props => <ServiceCreateAntenne {...props} mt="3" />} />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
