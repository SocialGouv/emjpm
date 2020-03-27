import { BoxWrapper } from "@emjpm/ui";
import { useRouter } from "next/router";
import React from "react";

import { LayoutPublic } from "../../src/components/Layout";
import { SignupContextProvider } from "../../src/components/Signup/context";
import { SignupServiceInvitation } from "../../src/components/Signup/SignupServiceInvitation";
import { withAuthSync } from "../../src/util/auth";

const SignupInvitationPage = () => {
  const {
    query: { token }
  } = useRouter();

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

export default withAuthSync(SignupInvitationPage);
