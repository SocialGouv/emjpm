import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { LayoutPublic } from "../../src/components/Layout";
import Signup from "../../src/components/Signup";
import { SignupContextProvider } from "../../src/components/Signup/context";
import { withAuthSync } from "../../src/util/auth";

const SignupPage = () => {
  return (
    <SignupContextProvider>
      <LayoutPublic>
        <BoxWrapper pt="6" px="1">
          <Signup />
        </BoxWrapper>
      </LayoutPublic>
    </SignupContextProvider>
  );
};

export default withAuthSync(SignupPage);
