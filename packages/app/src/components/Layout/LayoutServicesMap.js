import { BoxWrapper } from "@emjpm/ui";
import React, { Fragment, useContext } from "react";
import { Box } from "rebass";

import { Header } from "../Header";
import { Navigation } from "../Navigation";
import { UserContext } from "../UserContext";

const navigationLinks = [
  {
    title: "Vos mesures",
    url: "/services",
  },
  {
    title: "Vos mesures en attente",
    url: "/services/waiting-mesures",
  },
  {
    title: "La carte de vos mesures",
    url: "/services/map",
  },
];

const LayoutServicesMap = (props) => {
  const { children } = props;

  const user = useContext(UserContext);

  let links = navigationLinks;

  if (user.enquete) {
    const [serviceMember] = user.service_members;
    const { code } = serviceMember.service.departement;

    if (code === "75") {
      links = navigationLinks.concat({
        title: `Enquête ${user.enquete.annee}`,
        url: "/services/enquetes/[enquete_id]",
        as: `/services/enquetes/${user.enquete.id}`,
      });
    }
  }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          dropDownLinks={[
            {
              title: "Vos informations",
              url: "/services/informations",
            },
            {
              title: "Gestion des comptes",
              url: "/services/members",
            },
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

export { LayoutServicesMap };
