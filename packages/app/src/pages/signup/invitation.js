import useSearchParams from "~/hooks/useSearchParams";

import { LayoutPublic } from "~/containers/Layout";
import { SignupContextProvider } from "~/containers/Signup/context";
import { SignupServiceInvitation } from "~/containers/Signup/SignupServiceInvitation";
import { BoxWrapper } from "~/components/Grid";

function SignupInvitationPage() {
  const { token } = useSearchParams();

  return (
    <SignupContextProvider>
      <LayoutPublic>
        <BoxWrapper pt="6" px="1">
          <SignupServiceInvitation token={token} />
        </BoxWrapper>
      </LayoutPublic>
    </SignupContextProvider>
  );
}

export default SignupInvitationPage;
