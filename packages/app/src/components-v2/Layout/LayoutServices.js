import React, { Fragment } from "react";

import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { Header, DropDownMenu } from "@socialgouv/emjpm-ui-components";
import { useQuery } from "@apollo/react-hooks";

import { GET_SERVICE_USERS } from "./queries";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";
import { Link } from "../Commons";
import { logout } from "../../util/auth";

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

const dropDownLinks = [
  { title: "Centre d'assistance", url: "test" },
  { title: "Profil", url: "test" },
  { title: "Paramètres", url: "test" }
];

const LayoutServices = props => {
  const { data, error, loading } = useQuery(GET_SERVICE_USERS);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  const [user] = data.users;
  console.log(data);
  const { username } = user;

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
        <Header
          Link={Link}
          dropDownLinks={dropDownLinks}
          disconnect={logout}
          DropDownMenu={DropDownMenu}
          username={username}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {props.children}
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
    </Fragment>
  );
};

export { LayoutServices };
