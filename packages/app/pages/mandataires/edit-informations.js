import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandatairesEditInformations } from "../../src/components/MandatairesEditInformations";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Heading1>Editer mes informations</Heading1>
        <UserInformations
          Component={props => {
            return <MandatairesEditInformations {...props} mt="3" />;
          }}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(EditInformations);
