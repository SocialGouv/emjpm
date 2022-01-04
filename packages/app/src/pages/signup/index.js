import { Helmet } from "react-helmet";

import { LayoutPublic } from "~/containers/Layout";
import Signup from "~/containers/Signup";
import { SignupContextProvider } from "~/containers/Signup/context";
import { BoxWrapper } from "~/components/Grid";

function SignupPage() {
  return (
    <>
      <Helmet>
        <title>Création de compte | e-MJPM</title>
      </Helmet>
      <SignupContextProvider>
        <LayoutPublic>
          <BoxWrapper pt="6" px="1">
            <Signup />
          </BoxWrapper>
        </LayoutPublic>
      </SignupContextProvider>
    </>
  );
}

export default SignupPage;
