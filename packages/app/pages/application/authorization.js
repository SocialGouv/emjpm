import { BoxWrapper, FlexWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Box, Image } from "rebass";

import { AuthorizationLogin } from "../../src/components/AuthorizationLogin";
import { Authorize } from "../../src/components/Authorize";
import { LayoutPublic } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const AuthorizationPage = (props) => {
  const { token, editorId, editorSecret, redirectUrl } = props;
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Heading1 mt={"80px"} textAlign="center">
          Se connecter à une application métier
        </Heading1>
      </BoxWrapper>
      <FlexWrapper my="50px">
        <Box
          sx={{
            flexBasis: ["100%", "50%"],
            p: "3",
          }}
        >
          <Image
            src="/static/images/login-application.png"
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
            <Authorize editorId={editorId} editorSecret={editorSecret} redirectUrl={redirectUrl} />
          ) : (
            <AuthorizationLogin />
          )}
        </Box>
      </FlexWrapper>
    </LayoutPublic>
  );
};

AuthorizationPage.getInitialProps = async ({ token, query }) => {
  return {
    editorId: query["editor_id"],
    editorSecret: query["editor_secret"],
    redirectUrl: query["redirect_url"],
    token,
  };
};

export default withAuthSync(AuthorizationPage);
