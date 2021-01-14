import { LayoutPublic } from "~/components/Layout";
import Signup from "~/components/Signup";
import { SignupContextProvider } from "~/components/Signup/context";
import { BoxWrapper } from "~/ui";

function SignupPage() {
  return (
    <SignupContextProvider>
      <LayoutPublic>
        <BoxWrapper pt="6" px="1">
          <Signup />
        </BoxWrapper>
      </LayoutPublic>
    </SignupContextProvider>
  );
}

export default SignupPage;
