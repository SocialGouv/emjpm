import { css, Global } from "@emotion/core";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "../Header";
import { Navigation } from "../Navigation";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/services"
  },
  {
    title: "Vos mesures en attente",
    url: "/services/waiting-mesures"
  },
  {
    title: "La carte de vos mesures",
    url: "/services/map"
  },
  {
    title: "Importez vos mesures",
    url: "/services/mesures/import"
  },
  {
    title: "Vos informations",
    url: "/services/informations"
  },
  {
    title: "Gestion des comptes",
    url: "/services/members"
  }
];

const LayoutServicesMap = props => {
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
    </Fragment>
  );
};

export { LayoutServicesMap };
