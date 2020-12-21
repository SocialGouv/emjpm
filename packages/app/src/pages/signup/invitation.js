import { useRouter } from "next/router";
import React from "react";

import { LayoutPublic } from "~/components/Layout";
import { SignupContextProvider } from "~/components/Signup/context";
import { SignupServiceInvitation } from "~/components/Signup/SignupServiceInvitation";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const SignupInvitationPage = () => {
  const {
    query: { token },
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
