import { FlexWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutPublic } from "../../src/components/Layout";
import { ResetPassword } from "../../src/components/ResetPassword";
import { withAuthSync } from "../../src/util/auth";

const ResetPasswordPage = props => {
  const { resetToken } = props;
  return (
    <LayoutPublic>
      <FlexWrapper mt={6} px="1" alignItems="center" flexDirection="column" justifyContent="center">
        <Heading1>Modifier votre mot de passe</Heading1>
        <ResetPassword token={resetToken} mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

ResetPasswordPage.getInitialProps = async ({ query }) => {
  return { resetToken: query.token };
};

export default withAuthSync(ResetPasswordPage);
