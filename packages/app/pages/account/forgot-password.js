import { FlexWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutPublic } from "../../src/components-v2/Layout";
import { ResetPassword } from "../../src/components-v2/ResetPassword";
import { withAuthSync } from "../../src/util/auth";

const resetPassword = () => {
  return (
    <LayoutPublic>
      <FlexWrapper mt={6} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading1>Modifier votre mot de passe</Heading1>
        <ResetPassword mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(resetPassword);
