import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { UserContext } from "../UserContext";

const navigationLinks = [
  {
    title: "Tableau de bord",
    url: "/services",
  },
  {
    title: "Mesures",
    url: "/services/mesures",
  },
  {
    title: "Carte",
    url: "/services/map",
  },
];

const LayoutServices = (props) => {
  const { children, hasNavigation = true } = props;
  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete) {
    const [serviceMember] = user.service_members;
    const { code } = serviceMember.service.departement;

    if (code === "75") {
      links = navigationLinks.concat({
        as: `/services/enquetes/${user.enquete.id}`,
        title: `Enquête ${user.enquete.annee}`,
        url: "/services/enquetes/[enquete_id]",
      });
    }
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }}>
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
    </Fragment>
  );
};

export { LayoutServices };
