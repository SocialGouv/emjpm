import React, { Fragment } from "react";
import { Box } from "rebass";
import { Global, css } from "@emotion/core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import { Wrapper } from "../commons";
import { Header } from "../header";
import { Footer } from "../footer";
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
            font-family: "open-sans", sans-serif;
            background: #f2f5f9;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />
      <Box bg="cardPrimary">
        <Wrapper>
          <Header />
          <Navigation links={links} />
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

export { Layout };
