import React, { Fragment } from "react";
import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { Wrapper } from "../commons";
import { Header } from "../header";
import { Navigation } from "../navigation";

const Layout = props => {
  const { links } = props;
  return (
    <Fragment>
      <GlobalStyle />
      <Global
        styles={css`
          body,
          html,
          div#__next {
            background: #f2f5f9;
          }
        `}
      />
      <Box bg="cardPrimary">
        <Wrapper>
          <Header />
          <Navigation links={links} />
        </Wrapper>
      </Box>
      <Box>{props.children}</Box>
    </Fragment>
  );
};

export { Layout };
