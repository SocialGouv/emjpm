import { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function LayoutDirection({ children }) {
  const { type } = useUser();
  const navigationLinks = [
    {
      title: "Statistiques",
      to: "/direction",
    },
    {
      title: "Liste blanche",
      to: "/direction/liste-blanche",
    },
  ];

  if (type === "admin" || type === "direction") {
    navigationLinks.splice(2, 0, {
      title: "Enquêtes",
      to: "/direction/enquetes",
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            { title: "Vos informations", to: "/direction/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      <Box>{children}</Box>
      <Footer />
    </Fragment>
  );
}

export { LayoutDirection };
