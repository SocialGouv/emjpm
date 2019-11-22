import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceEdit } from "../../src/components-v2/ServiceEdit";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const AddAntennes = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
        <Heading1 mx="1">Editer les informations de votre service</Heading1>
        <UserInformations Component={props => <ServiceEdit {...props} mt="3" />} />
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddAntennes);
