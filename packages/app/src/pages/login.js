import { BoxWrapper, FlexWrapper } from "@emjpm/ui";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
import { Box, Image } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutPublic } from "~/components/Layout";
import { Login, LoginCreateAccount } from "~/components/Login";
import { withAuthSync } from "~/util/auth";

const ExcludeBrowserBanner = dynamic(
  async () => {
    const { ExcludeBrowserBanner } = await import(
      "~/components/ExcludeBrowserBanner"
    );
    return ExcludeBrowserBanner;
  },
  {
    ssr: false,
  }
);

const LoginPage = () => {
  return (
    <Fragment>
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
              src="/static/images/login.png"
              sx={{
                p: "3",
                width: ["100%"],
              }}
            />
            {/* <Box sx={{ p: "6" }}>
            <Heading4 mb="3">
              Une connaissance en temps réel de l’activité des travailleurs sociaux
            </Heading4>
            <Heading4 mb="3">
              Un référentiel géolocalisé de l’ensemble des tuteurs et de leur disponibilité
            </Heading4>
            <Heading4>Une simplification des démarches pour les personnes sous protection</Heading4>
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
    </Fragment>
  );
};

export default withAuthSync(LoginPage);
