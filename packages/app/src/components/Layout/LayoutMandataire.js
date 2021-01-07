import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

const navigationLinks = [
  {
    title: "Tableau de bord",
    to: "/mandataires",
  },
  {
    title: "Mesures",
    to: "/mandataires/mesures",
  },
  {
    title: "Carte",
    to: "/mandataires/map",
  },
];

const LayoutMandataire = (props) => {
  const { children, hasNavigation = true, hasFooterMargins = true } = props;
  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete) {
    links = navigationLinks.concat({
      title: `Enquête ${user.enquete.annee}`,
      to: `/mandataires/enquetes/${user.enquete.id}`,
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }}>
        <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
          <Header
            dropDownLinks={[
              { title: "Vos informations", to: "/mandataires/informations" },
            ]}
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
            <Footer hasMarginTop={hasFooterMargins} />
          </BoxWrapper>
        </Box>
      </Box>
    </Fragment>
  );
};

export { LayoutMandataire };
