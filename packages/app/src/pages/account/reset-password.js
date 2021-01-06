import React from "react";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { ResetPassword } from "~/components/ResetPassword";
import { FlexWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const ResetPasswordPage = () => {
  const { token } = useQuery();
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
        <ResetPassword token={token} mt="3" />
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default ResetPasswordPage;
