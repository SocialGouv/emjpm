import { css, Global } from "@emotion/core";
import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import { GlobalStyle } from "@socialgouv/emjpm-ui-global-style";
import React, { Fragment } from "react";
import { Box } from "rebass";
import { Footer } from "../Footer";
import { Header } from "@socialgouv/emjpm-ui-components";
import { dropDownLinks } from "./dropDownLink";

const LayoutSignup = props => {
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
      <Header {...props} dropDownLinks={dropDownLinks} />
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        {children}
      </Box>
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
    </Fragment>
  );
};

export { LayoutSignup };
