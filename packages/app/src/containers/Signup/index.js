import { useContext } from "react";

import { SignupContext } from "./context";
import { SignupDirection } from "./SignupDirection";
import { SignupForm } from "./SignupForm";
import { SignupMagistrat } from "./SignupMagistrat";
import { SignupGreffier } from "./SignupGreffier";
import { SignupMandataire } from "./SignupMandataire";
import { SignupService } from "./SignupService";
import { SignupDpfi } from "./SignupDpfi";

function Signup(props) {
  const { user, isStepOneValidate } = useContext(SignupContext);
  return (
    <>
      {!isStepOneValidate && <SignupForm {...props} />}
      {isStepOneValidate && user.type === "individuel" && <SignupMandataire />}
      {isStepOneValidate && user.type === "prepose" && <SignupMandataire />}
      {isStepOneValidate && user.type === "service" && <SignupService />}
      {isStepOneValidate && user.type === "ti" && <SignupMagistrat />}
      {isStepOneValidate && user.type === "greffier" && <SignupGreffier />}
      {isStepOneValidate && user.type === "direction" && <SignupDirection />}
      {isStepOneValidate && user.type === "dpfi" && <SignupDpfi />}
      {isStepOneValidate && user.type === "sdpf" && <SignupDpfi />}
    </>
  );
}

export default Signup;
