import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/components";
import { Navigation } from "~/containers/Navigation";
import { BoxWrapper } from "~/components/Grid";

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
    <>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            { title: "Vos informations", to: "/admin/informations" },
          ]}
        />
        {hasNavigation && (
          <BoxWrapper>
            <Navigation links={navigationLinks} />
          </BoxWrapper>
        )}
      </Box>
      <Box>{children}</Box>

      <Footer />
    </>
  );
}

export { LayoutAdmin };
