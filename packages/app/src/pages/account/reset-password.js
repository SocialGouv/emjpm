import React from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { ResetPassword } from "~/components/ResetPassword";
import { FlexWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ResetPasswordPage = (props) => {
  const { resetToken } = props;
  return (
    <LayoutPublic>
      <FlexWrapper
        mt={6}
        px="1"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <ResetPassword token={resetToken} mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

ResetPasswordPage.getInitialProps = async ({ query }) => {
  return { resetToken: query.token };
};

export default withAuthSync(ResetPasswordPage);
