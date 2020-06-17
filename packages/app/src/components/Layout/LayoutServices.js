import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { SatisfactionCampaign } from "../SatisfactionCampaign";
import { ServiceInformationsSidebar } from "../ServiceInformationsSidebar";
import { UserContext } from "../UserContext";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/services",
  },
  {
    title: "Vos mesures en attente",
    url: "/services/waiting-mesures",
  },
  {
    title: "La carte de vos mesures",
    url: "/services/map",
  },
];

const LayoutServices = (props) => {
  const { children, hasNavigation = true } = props;
  const user = useContext(UserContext);

  const links = user.enquete
    ? navigationLinks.concat({
        title: `Enquête ${user.enquete.annee}`,
        url: "/services/enquetes/[enquete_id]",
        as: `/services/enquetes/${user.enquete.id}`,
      })
    : navigationLinks;

  return (
    <Fragment>
      <Box sx={{ mr: "300px", position: "relative", "z-index": "1000" }}>
        <Box sx={{ bg: "white" }}>
          <Header
            dropDownLinks={[
              {
                title: "Vos informations",
                url: "/services/informations",
              },
              {
                title: "Gestion des comptes",
                url: "/services/members",
              },
            ]}
          />
          {hasNavigation && (
            <BoxWrapper>
              <Navigation links={links} />
            </BoxWrapper>
          )}
        </Box>
        <Box px="1">{children}</Box>
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
        <ServiceInformationsSidebar />
      </Box>
      {process.env.NEXT_PUBLIC_EMJPM_APP_DISABLE_SATISFACTION_CAMPAIGN !== "true" && (
        <SatisfactionCampaign />
      )}
    </Fragment>
  );
};

export { LayoutServices };
