import { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

const navigationLinks = [
  {
    title: "Tableau de bord",
    to: "/services",
  },
  {
    title: "Mesures",
    to: "/services/mesures",
  },
  {
    title: "Carte",
    to: "/services/map",
  },
];

function LayoutServices(props) {
  const { children, hasNavigation = true } = props;
  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete) {
    const [serviceMember] = user.service_members;
    const { code } = serviceMember.service.departement;

    links = navigationLinks.concat({
      title: `Enquête ${user.enquete.annee}`,
      to: `/services/enquetes/${user.enquete.id}`,
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }}>
        <Box sx={{ bg: "white" }}>
          <Header
            dropDownLinks={[
              {
                title: "Vos informations",
                to: "/services/informations",
              },
              {
                title: "Gestion des comptes",
                to: "/services/members",
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
}

export { LayoutServices };
