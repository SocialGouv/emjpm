import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";

const navigationLinks = [
  {
    title: "Vos mandataires",
    url: "/magistrats",
  },
  {
    title: "La carte des mandataires",
    url: "/magistrats/map",
  },
  {
    title: "Vos mesures",
    url: "/magistrats/mesures",
  },
];

const LayoutMagistrat = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          {...props}
          dropDownLinks={[
            { title: "Vos informations", url: "/magistrats/informations" },
          ]}
        />
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
      {process.env.NEXT_PUBLIC_EMJPM_APP_DISABLE_SATISFACTION_CAMPAIGN !==
        "true" && <SatisfactionCampaign />}
    </Fragment>
  );
};

export { LayoutMagistrat };
