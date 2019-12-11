import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { EditPassword } from "../../src/components/EditPassword";
import { LayoutMandataire } from "../../src/components/Layout";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Heading1>Modifier votre mot de passe</Heading1>
        <UserInformations
          Component={props => {
            return <EditPassword {...props} mt="3" />;
          }}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(EditInformations);
