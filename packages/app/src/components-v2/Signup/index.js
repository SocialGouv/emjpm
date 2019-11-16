import React, { useContext } from "react";

import { SignupContext } from "./context";
import { SignupDirection } from "./SignupDirection";
import { SignupForm } from "./SignupForm";
import { SignupMagistrat } from "./SignupMagistrat";
import { SignupMandataire } from "./SignupMandataire";
import { SignupService } from "./SignupService";

const Signup = props => {
  const { user, isStepOneValidate } = useContext(SignupContext);

  return (
    <>
      {!isStepOneValidate && <SignupForm {...props} />}
      {isStepOneValidate && user.type === "individuel" && <SignupMandataire />}
      {isStepOneValidate && user.type === "prepose" && <SignupMandataire />}
      {isStepOneValidate && user.type === "service" && <SignupService />}
      {isStepOneValidate && user.type === "ti" && <SignupMagistrat />}
      {isStepOneValidate && user.type === "direction" && <SignupDirection />}
    </>
  );
};

export default Signup;
