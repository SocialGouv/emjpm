import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";

const navigationLinks = [
  {
    title: "Mandataires",
    url: "/direction"
  },
  {
    title: "Mesures",
    url: "/direction/mesures"
  },
  {
    title: "Vos informations",
    url: "/direction/informations"
  }
];

const LayoutDirection = props => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header />
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
      <SatisfactionCampaign />
    </Fragment>
  );
};

export { LayoutDirection };
