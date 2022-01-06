import { Box, Image } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutPublic } from "~/containers/Layout";
import { TokenRequest } from "~/containers/TokenRequest";
import { BoxWrapper, FlexWrapper } from "~/components/Grid";

function AuthorizationPage() {
  return (
    <>
      <Helmet>
        <title>Demander des accès à l'api Emjpm | e-MJPM</title>
      </Helmet>
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
    </>
  );
}

export default AuthorizationPage;
