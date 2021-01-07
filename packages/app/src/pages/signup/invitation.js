import React from "react";
import { useParams } from "react-router-dom";

import { LayoutPublic } from "~/components/Layout";
import { SignupContextProvider } from "~/components/Signup/context";
import { SignupServiceInvitation } from "~/components/Signup/SignupServiceInvitation";
import { BoxWrapper } from "~/ui";

const SignupInvitationPage = () => {
  const { token } = useParams();

  return (
    <SignupContextProvider>
      <LayoutPublic>
        <BoxWrapper pt="6" px="1">
          <SignupServiceInvitation token={token} />
        </BoxWrapper>
      </LayoutPublic>
    </SignupContextProvider>
  );
};

export default SignupInvitationPage;
