import { BoxWrapper } from "@emjpm/ui";
import { css, Global } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";

const navigationLinks = [
  {
    title: "Mandataires",
    url: "/direction"
  },
  {
    title: "Mesures",
    url: "/direction/mesures"
  },
  {
    title: "Vos informations",
    url: "/direction/informations"
  }
];

const LayoutDirection = props => {
  const { children } = props;
  return (
    <Fragment>
      {/* @socialgouv global style */}
      <GlobalStyle />
      {/* custom global style */}
      <Global
        styles={css`
          body,
          html,
          div#__next {
            font-size: 14px;
            font-family: "Open Sans", sans-serif;
            background: #f2f5f9;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
      <SatisfactionCampaign />
    </Fragment>
  );
};

export { LayoutDirection };
