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
  }
];

const LayoutServicesMap = props => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            {
              title: "Vos informations",
              url: "/services/informations"
            },
            {
              title: "Gestion des comptes",
              url: "/services/members"
            }
          ]}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
};

export { LayoutServicesMap };
