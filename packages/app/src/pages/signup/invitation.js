import useSearchParams from "~/hooks/useSearchParams";

import { LayoutPublic } from "~/components/Layout";
import { SignupContextProvider } from "~/components/Signup/context";
import { SignupServiceInvitation } from "~/components/Signup/SignupServiceInvitation";
import { BoxWrapper } from "~/ui";

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
