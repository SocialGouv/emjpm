import { Fragment } from "react";
import { Box, Image } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutPublic } from "~/containers/Layout";
import { Login, LoginCreateAccount } from "~/containers/Login";
import { BoxWrapper, FlexWrapper } from "~/components/Grid";

import { ExcludeBrowserBanner } from "~/containers/ExcludeBrowserBanner";

function LoginPage() {
  return (
    <>
      <LayoutPublic>
        <BoxWrapper>
          <HeadingTitle mt={"80px"} textAlign="center">
            Trouvez le bon professionnel pour les majeurs à protéger
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
              src="/images/login.png"
              sx={{
                p: "3",
                width: ["100%"],
              }}
            />
            {/* <Box sx={{ p: "6" }}>
            <Heading size={4} mb="3">
              Une connaissance en temps réel de l’activité des travailleurs sociaux
            </Heading>
            <Heading size={4} mb="3">
              Un référentiel géolocalisé de l’ensemble des tuteurs et de leur disponibilité
            </Heading>
            <Heading size={4}>Une simplification des démarches pour les personnes sous protection</Heading>
          </Box> */}
          </Box>
          <Box
            sx={{
              flexBasis: ["100%", "50%"],
              p: "3",
            }}
          >
            <ExcludeBrowserBanner />
            <Login />
            <LoginCreateAccount />
          </Box>
        </FlexWrapper>
      </LayoutPublic>
    </>
  );
}

export default LoginPage;
