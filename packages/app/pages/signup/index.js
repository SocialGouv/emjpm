import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutSignup } from "../../src/components/Layout";
import Signup from "../../src/components/Signup";
import { SignupContextProvider } from "../../src/components/Signup/context";
import { withAuthSync } from "../../src/util/auth";

const SignupPage = () => {
  return (
    <SignupContextProvider>
      <LayoutSignup>
        <BoxWrapper pt="6" px="1">
          <Signup />
        </BoxWrapper>
      </LayoutSignup>
    </SignupContextProvider>
  );
};

export default withAuthSync(SignupPage);
