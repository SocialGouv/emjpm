import { BoxWrapper, FlexWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Image } from "rebass";

import { AuthorizationLogin } from "~/components/AuthorizationLogin";
import { Authorize } from "~/components/Authorize";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AuthorizationPage = (props) => {
  const { token, state, editorId, redirectUrl } = props;

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

AuthorizationPage.getInitialProps = async ({ token, query }) => {
  return {
    editorId: query["client_id"],
    redirectUrl: query["redirect_uri"],
    state: query["state"] || Math.random().toString(36).slice(2),
    token,
  };
};

export default withAuthSync(AuthorizationPage);
