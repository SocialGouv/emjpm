import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";
import { UserContext } from "../UserContext";

const LayoutDirection = ({ children }) => {
  const { type } = useContext(UserContext);
  const navigationLinks = [
    {
      title: "Statistiques",
      url: "/direction",
    },
    {
      title: "Liste blanche",
      url: "/direction/liste-blanche",
    },
  ];

  if (type === "admin" || type === "direction") {
    navigationLinks.splice(2, 0, { title: "Enquêtes", url: "/direction/enquetes" });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header dropDownLinks={[{ title: "Vos informations", url: "/direction/informations" }]} />
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
      {process.env.NEXT_PUBLIC_EMJPM_APP_DISABLE_SATISFACTION_CAMPAIGN !== "true" && (
        <SatisfactionCampaign />
      )}
    </Fragment>
  );
};

export { LayoutDirection };
