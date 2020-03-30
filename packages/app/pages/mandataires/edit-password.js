import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { EditPassword } from "../../src/components/EditPassword";
import { LayoutMandataire } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const EditInformations = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Heading1>Modifier votre mot de passe</Heading1>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(EditInformations);
