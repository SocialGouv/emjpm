import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { BoxWrapper, Header } from "~/ui";

const LayoutPublic = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Box
        sx={{ height: "66px", position: "relative", "z-index": "1000" }}
        bg="cardPrimary"
      >
        <Header isDisconnected />
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

export { LayoutPublic };
