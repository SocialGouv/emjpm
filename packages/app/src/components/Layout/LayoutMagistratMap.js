import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "../Header";
import { Navigation } from "../Navigation";

const navigationLinks = [
  {
    title: "Vos mandataires",
    url: "/magistrats"
  },
  {
    title: "La carte des mandataires",
    url: "/magistrats/map"
  },
  {
    title: "Vos mesures",
    url: "/magistrats/mesures"
  },
  {
    title: "Vos informations",
    url: "/magistrats/informations"
  }
];

const LayoutMagistratMap = props => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header {...props} />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
};

export { LayoutMagistratMap };
