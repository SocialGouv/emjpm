import { Helmet } from "react-helmet";

import { ForgotPassword } from "~/containers/ForgotPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutPublic } from "~/containers/Layout";
import { FlexWrapper } from "~/components/Grid";

function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Demander un nouveau mot de passe | e-MJPM </title>
      </Helmet>
      <LayoutPublic>
        <FlexWrapper
          mt={6}
          px="1"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <HeadingTitle>Demander un nouveau mot de passe</HeadingTitle>
          <ForgotPassword mt="3" />
        </FlexWrapper>
      </LayoutPublic>
    </>
  );
}

export default ForgotPasswordPage;
