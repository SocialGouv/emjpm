import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

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
    navigationLinks.splice(2, 0, {
      title: "Enquêtes",
      url: "/direction/enquetes",
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            { title: "Vos informations", url: "/direction/informations" },
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
    </Fragment>
  );
};

export { LayoutDirection };
