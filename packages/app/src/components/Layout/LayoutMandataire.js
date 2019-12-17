import { css, Global } from "@emotion/core";
import { DropDownMenu, Header } from "@socialgouv/emjpm-ui-components";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { logout } from "../../util/auth";
import { Link } from "../Commons";
import { Footer } from "../Footer";
import { MandataireInformationsSidebar } from "../MandataireInformationsSidebar";
import { Navigation } from "../Navigation";
import { UserInformations } from "../UserInformations";
import { dropDownLinks } from "./dropDownLink";
const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/mandataires"
  },
  {
    title: "Vos mesures en attente",
    url: "/mandataires/waiting-mesures"
  },
  {
    title: "Importez vos mesures",
    url: "/mandataires/import-mesures"
  },
  {
    title: "Vos informations",
    url: "/mandataires/informations"
  }
];

const LayoutMandataire = props => {
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
      <Box sx={{ mr: "300px", position: "relative", "z-index": "1000" }}>
        <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
          <UserInformations
            Component={props => {
              return (
                <Header
                  {...props}
                  Link={Link}
                  dropDownLinks={dropDownLinks}
                  disconnect={logout}
                  DropDownMenu={DropDownMenu}
                />
              );
            }}
          />
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
        <MandataireInformationsSidebar />
      </Box>
    </Fragment>
  );
};

export { LayoutMandataire };
