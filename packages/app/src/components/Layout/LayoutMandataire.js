import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { MandataireInformationsSidebar } from "../MandataireInformationsSidebar";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";
import { UserContext } from "../UserContext";
import isPayedByParis from "./isPayedByParis";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/mandataires",
  },
  {
    title: "Vos mesures en attente",
    url: "/mandataires/waiting-mesures",
  },
  {
    title: "La carte de vos mesures",
    url: "/mandataires/map",
  },
];

const LayoutMandataire = (props) => {
  const { children, hasNavigation = true } = props;
  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete && isPayedByParis(user)) {
    links = navigationLinks.concat({
      title: `Enquête ${user.enquete.annee}`,
      url: "/mandataires/enquetes/[enquete_id]",
      as: `/mandataires/enquetes/${user.enquete.id}`,
    });
  }

  return (
    <Fragment>
      <Box sx={{ mr: "300px", position: "relative", "z-index": "1000" }}>
        <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
          <Header
            dropDownLinks={[{ title: "Vos informations", url: "/mandataires/informations" }]}
          />
          {hasNavigation && (
            <BoxWrapper>
              <Navigation links={links} />
            </BoxWrapper>
          )}
        </Box>
        {children}
        <Box bg="cardPrimary">
          <BoxWrapper px="1">
            <Footer />
          </BoxWrapper>
        </Box>
      </Box>
      <Box
        sx={{
          bg: "white",
          borderLeft: "2px solid #E3E6EA",
          height: "100vh",
          overflow: "scroll",
          position: "fixed",
          right: 0,
          top: 0,
          width: "300px",
        }}
      >
        <MandataireInformationsSidebar />
      </Box>
      <SatisfactionCampaign />
    </Fragment>
  );
};

export { LayoutMandataire };
