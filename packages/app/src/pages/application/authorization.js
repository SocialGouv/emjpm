import { Box, Image } from "rebass";

import { AuthorizationLogin } from "~/components/AuthorizationLogin";
import { Authorize } from "~/components/Authorize";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { BoxWrapper, FlexWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const AuthorizationPage = (props) => {
  const { token } = props;

  const query = useParams();
  const editorId = query["client_id"];
  const redirectUrl = query["redirect_uri"];
  const state = query["state"] || Math.random().toString(36).slice(2);

  return (
    <LayoutPublic>
      <BoxWrapper>
        <HeadingTitle mt={"80px"} textAlign="center">
          Se connecter à une application métier
        </HeadingTitle>
      </BoxWrapper>
      <FlexWrapper my="50px">
        <Box
          sx={{
            flexBasis: ["100%", "50%"],
            p: "3",
          }}
        >
          <Image
            src="/images/login-application.png"
            sx={{
              mt: "80px",
              p: "3",
              width: ["100%"],
            }}
          />
        </Box>
        <Box
          sx={{
            flexBasis: ["100%", "50%"],
            p: "3",
          }}
        >
          {token ? (
            <Authorize
              state={state}
              token={token}
              editorId={editorId}
              redirectUrl={redirectUrl}
            />
          ) : (
            <AuthorizationLogin />
          )}
        </Box>
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default AuthorizationPage;
