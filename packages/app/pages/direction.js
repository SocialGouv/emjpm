import React, { Fragment } from "react";
import { Box } from "rebass";
import { Wrapper } from "../src/components-v2/commons";
import { Header } from "../src/components-v2/header";
import { Navigation } from "../src/components-v2/navigation";
import { Global, css } from "@emotion/core";

const direction = () => {
  return (
    <Fragment>
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
          <Navigation />
        </Wrapper>
      </Box>
    </Fragment>
  );
};

export default direction;
