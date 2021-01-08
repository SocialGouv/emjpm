import { ForgotPassword } from "~/components/ForgotPassword";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { FlexWrapper } from "~/ui";

const ForgotPasswordPage = () => {
  return (
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
  );
};

export default ForgotPasswordPage;
