import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { EditPassword } from "~/components/EditPassword";
import { LayoutDirection } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const EditInformations = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Heading1>Modifier votre mot de passe</Heading1>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EditInformations);
