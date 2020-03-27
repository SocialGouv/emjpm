import { BoxWrapper } from "@emjpm/ui";
import { css, Global } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";

const navigationLinks = [
  {
    title: "Utilisateurs",
    url: "/admin"
  },
  {
    title: "Services",
    url: "/admin/services"
  },
  {
    title: "Tribunaux",
    url: "/admin/tribunaux"
  },
  {
    title: "Editeurs",
    url: "/admin/editors"
  },
  {
    title: "API Logs",
    url: "/admin/api_logs"
  },
  {
    title: "Campagnes de satisfaction",
    url: "/admin/satisfaction_campaigns"
  }
];

const LayoutAdmin = props => {
  const { children, hasNavigation = true } = props;

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
        {hasNavigation && (
          <BoxWrapper>
            <Navigation links={navigationLinks} />
          </BoxWrapper>
        )}
      </Box>
      {children}
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
    </Fragment>
  );
};

export { LayoutAdmin };
