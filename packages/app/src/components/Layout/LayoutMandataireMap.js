import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { UserContext } from "../UserContext";
import isPayedByParis from "./isPayedByParis";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/mandataires",
  },
  {
    title: "La carte de vos mesures",
    url: "/mandataires/map",
  },
];

const LayoutMandataireMap = (props) => {
  const { children } = props;

  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete && isPayedByParis(user)) {
    links = navigationLinks.concat({
      as: `/mandataires/enquetes/${user.enquete.id}`,
      title: `Enquête ${user.enquete.annee}`,
      url: "/mandataires/enquetes/[enquete_id]",
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            { title: "Vos informations", url: "/mandataires/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={links} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
};

export { LayoutMandataireMap };
