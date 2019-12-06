import { css, Global } from "@emotion/core";
import { DropDownMenu, Header } from "@socialgouv/emjpm-ui-components";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { logout } from "../../util/auth";
import { Link } from "../Commons";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";
import { ServiceInformationsSidebar } from "../ServiceInformationsSidebar";
import { UserInformations } from "../UserInformations";
import { dropDownLinks } from "./dropDownLink";

const navigationLinks = [
  {
    title: "Toutes vos mesures",
    url: "/services"
  },
  {
    title: "Vos mesures en attente",
    url: "/services/waiting-mesures"
  },
  {
    title: "Vos informations",
    url: "/services/informations"
  }
];

const LayoutServices = props => {
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
        <Box sx={{ bg: "white" }}>
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
        <UserInformations
          Component={props => {
            return <ServiceInformationsSidebar {...props} />;
          }}
        />
      </Box>
    </Fragment>
  );
};

export { LayoutServices };
