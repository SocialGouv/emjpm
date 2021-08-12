import { Box } from "rebass";
import { useLocation } from "react-router-dom";

import { Footer } from "~/containers/Footer";
import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function LayoutDirection({ children }) {
  const { type } = useUser();

  const { pathname } = useLocation();

  const navigationLinks = [
    {
      title: "Liste blanche",
      to: "/direction",
    },
    {
      title: "Statistiques",
      to: "/direction/mandataires/list",
      isActive: pathname === "/direction/stats" ? true : undefined,
    },
  ];

  if (type === "admin" || type === "direction") {
    navigationLinks.splice(2, 0, {
      title: "Enquêtes",
      to: "/direction/enquetes",
    });
  }

  return (
    <>
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
    </>
  );
}

export { LayoutDirection };
