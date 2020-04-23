import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "../Header";
import { Navigation } from "../Navigation";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/services"
  },
  {
    title: "Vos mesures en attente",
    url: "/services/waiting-mesures"
  },
  {
    title: "La carte de vos mesures",
    url: "/services/map"
  },
  {
    title: "Importez vos mesures",
    url: "/services/mesures/import"
  },
  {
    title: "Gestion des comptes",
    url: "/services/members"
  }
];

const LayoutServicesMap = props => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header dropDownLinks={[{ title: "Vos informations", url: "/services/informations" }]} />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
};

export { LayoutServicesMap };
