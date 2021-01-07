import React from "react";
import { Box, Image } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { TokenRequest } from "~/components/TokenRequest";
import { BoxWrapper, FlexWrapper } from "~/ui";

const AuthorizationPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <HeadingTitle mt={"80px"} textAlign="center">
          {"Demander des accès à l'api Emjpm"}
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
          <TokenRequest />
        </Box>
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default AuthorizationPage;
