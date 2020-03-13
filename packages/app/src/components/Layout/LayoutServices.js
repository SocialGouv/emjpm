import { css, Global } from "@emotion/core";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";
import { ServiceInformationsSidebar } from "../ServiceInformationsSidebar";

const LayoutServices = props => {
  const { children, hasNavigation = true } = props;

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
      <Box sx={{ mr: "300px", position: "relative", "z-index": "1000" }}>
        <Box sx={{ bg: "white" }}>
          <Header />
          {hasNavigation && (
            <BoxWrapper>
              <Navigation links={navigationLinks} />
            </BoxWrapper>
          )}
        </Box>
        <Box px="1">{children}</Box>
        <Box bg="cardPrimary">
          <BoxWrapper px="1">
            <Footer />
          </BoxWrapper>
        </Box>
      </Box>
      <Box
        sx={{
          bg: "white",
          borderLeft: "2px solid #E3E6EA",
          height: "100vh",
          overflow: "scroll",
          position: "fixed",
          right: 0,
          top: 0,
          width: "300px"
        }}
      >
        <ServiceInformationsSidebar />
      </Box>
      <SatisfactionCampaign />
    </Fragment>
  );
};

export { LayoutServices };
