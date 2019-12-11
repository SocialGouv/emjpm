import { BoxWrapper, FlexWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Image } from "rebass";

import { LayoutPublic } from "../src/components/Layout";
import { Login, LoginCreateAccount } from "../src/components/Login";
import { withAuthSync } from "../src/util/auth";

const LoginPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Heading1 mt={"80px"} textAlign="center">
          Trouvez le bon professionnel pour les majeurs à protéger
        </Heading1>
      </BoxWrapper>
      <FlexWrapper my="50px">
        <Box
          sx={{
            flexBasis: ["100%", "50%"],
            p: "3"
          }}
        >
          <Image
            src="/static/images/login.png"
            sx={{
              p: "3",
              width: ["100%"]
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
            p: "3"
          }}
        >
          <Login />
          <LoginCreateAccount />
        </Box>
      </FlexWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(LoginPage);
