import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";
import { UserContext } from "../UserContext";

function hasDirectionNationalRole(roles) {
  return roles.some(({ role }) => role && role.name === "direction_national");
}

const LayoutDirection = ({ children }) => {
  const { user_roles: userRoles } = useContext(UserContext);
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

  if (hasDirectionNationalRole(userRoles)) {
    navigationLinks.splice(2, 0, { title: "Enquêtes", url: "/direction/enquetes" });
  }

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
