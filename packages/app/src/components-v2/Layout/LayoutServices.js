import React, { Fragment } from "react";
import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { Header, DropDownMenu } from "@socialgouv/emjpm-ui-components";

import { Footer } from "../Footer";
import { Navigation } from "../Navigation";
import { Link } from "../Commons";
import { logout } from "../../util/auth";
import { dropDownLinks } from "./dropDownLink";
import { UserInformations } from "../UserInformations";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/services"
  },
  {
    title: "Vos informations",
    url: "/services/informations"
  }
];

const LayoutServices = props => {
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
    </Fragment>
  );
};

export { LayoutServices };
