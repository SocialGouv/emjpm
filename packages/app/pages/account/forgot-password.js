import { FlexWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { ForgotPassword } from "../../src/components/ForgotPassword";
import { LayoutPublic } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const ForgotPasswordPage = () => {
  return (
    <LayoutPublic>
      <FlexWrapper mt={6} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading1>Demander un nouveau mot de passe</Heading1>
        <ForgotPassword mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(ForgotPasswordPage);
