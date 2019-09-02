import React, { Fragment } from "react";

import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { Header, DropDownMenu } from "@socialgouv/emjpm-ui-components";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { DIRECTION_USERS, CURRENT_USER } from "./queries";
import { Footer } from "../Footer";
import { Navigation } from "../Navigation";
import { Link } from "../Commons";
import { logout } from "../../util/auth";

const navigationLinks = [
  {
    title: "mesures",
    url: "/direction/mesures"
  },
  {
    title: "mandataires",
    url: "/direction/mandataires"
  },
  {
    title: "données démographiques",
    url: "/direction/donnees-demographiques"
  }
];

const dropDownLinks = [
  { title: "Centre d'assistance", url: "test" },
  { title: "Profil", url: "test" },
  { title: "Paramètres", url: "test" }
];

const LayoutDirection = props => {
  const client = useApolloClient();
  const { currentId } = client.readQuery({ query: CURRENT_USER });
  const { data, error, loading } = useQuery(DIRECTION_USERS, {
    variables: {
      userId: currentId
    }
  });

  if (loading) return <div>chargement</div>;
  if (error) return <div>erreur</div>;
  const [user] = data.users;
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

export { LayoutDirection };
