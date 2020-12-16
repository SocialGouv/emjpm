import { FlexWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { ForgotPassword } from "~/components/ForgotPassword";
import { LayoutPublic } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const ForgotPasswordPage = () => {
  return (
    <LayoutPublic>
      <FlexWrapper
        mt={6}
        px="1"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading1>Demander un nouveau mot de passe</Heading1>
        <ForgotPassword mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(ForgotPasswordPage);
