import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { LayoutSignup } from "../../src/components-v2/Layout";
import Signup from "../../src/components-v2/Signup";
import { SignupContextProvider } from "../../src/components-v2/Signup/context";
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
