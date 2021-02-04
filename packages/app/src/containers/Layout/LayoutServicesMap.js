import { Fragment /*, useContext */ } from "react";
import { Box } from "rebass";

import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import { BoxWrapper } from "~/components/Grid";
// import { UserContext } from "~/containers/UserContext";

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

function LayoutServicesMap(props) {
  const { children } = props;

  // const user = useContext(UserContext);

  const links = navigationLinks;

  // if (user.enquete) {
  //   const [serviceMember] = user.service_members;
  //   const { code } = serviceMember.service.departement;

  //   if (code === "75") {
  //     links = navigationLinks.concat({
  //       title: `Enquête ${user.enquete.annee}`,
  //       to: `/services/enquetes/${user.enquete.id}`,
  //     });
  //   }
  // }

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
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
        <BoxWrapper>
          <Navigation links={links} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
}

export { LayoutServicesMap };
