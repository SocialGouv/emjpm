import { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

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

function LayoutMandataireMap(props) {
  const { children } = props;

  const user = useUser();

  let links = navigationLinks;

  if (user.enquete) {
    links = navigationLinks.concat({
      title: `Enquête ${user.enquete.annee}`,
      to: `/mandataires/enquetes/${user.enquete.id}`,
    });
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            { title: "Vos informations", to: "/mandataires/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={links} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
}

export { LayoutMandataireMap };
