import { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { BoxWrapper } from "~/ui";

const navigationLinks = [
  {
    title: "Utilisateurs",
    to: "/admin",
  },
  {
    title: "Services",
    to: "/admin/services",
  },
  {
    title: "Etablissements",
    to: "/admin/etablissements",
  },
  {
    title: "Tribunaux",
    to: "/admin/tribunaux",
  },
  {
    title: "Liste blanche",
    to: "/admin/liste-blanche",
  },
  {
    title: "Editeurs",
    to: "/admin/editors",
  },
  {
    title: "API Logs",
    to: "/admin/api-logs",
  },
];

function LayoutAdmin(props) {
  const { children, hasNavigation = true } = props;

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header />
        {hasNavigation && (
          <BoxWrapper>
            <Navigation links={navigationLinks} />
          </BoxWrapper>
        )}
      </Box>
      {children}
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
    </Fragment>
  );
}

export { LayoutAdmin };
