import React, { Fragment } from "react";

import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { useQuery } from "@apollo/react-hooks";

import { GET_USERS } from "../../graphql/Queries";
import { Wrapper } from "../commons";
import { Header } from "../header";
import { Footer } from "../footer";
import { Navigation } from "../navigation";
import { DropDownMenu } from "../dropDownMenu";

const navigationLinks = [
  {
    title: "mesures",
    url: "/direction/mesures"
  },
  {
    title: "mandataires",
    url: "/direction/mandataires"
  }
];

const dropDownLinks = [
  {
    title: "Mon compte",
    url: "/direction/mesures"
  }
];

const LayoutDirection = props => {
  const { data, error, loading } = useQuery(GET_USERS);
  if (loading) return <div>test</div>;
  if (error) return <div>test</div>;
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
      <Box bg="cardPrimary">
        <Header
          username={username}
          DropDownMenu={() => <DropDownMenu dropDownLinks={dropDownLinks} />}
        />
        <Wrapper>
          <Navigation links={navigationLinks} />
        </Wrapper>
      </Box>
      <Wrapper>
        <Box mt="6">{props.children}</Box>
      </Wrapper>
      <Box bg="cardPrimary">
        <Wrapper>
          <Footer />
        </Wrapper>
      </Box>
    </Fragment>
  );
};

export { LayoutDirection };
