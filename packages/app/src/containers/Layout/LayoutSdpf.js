import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/components";
import { Navigation } from "~/containers/Navigation";

import { BoxWrapper } from "~/components/Grid";

const navigationLinks = [
  {
    title: "Tableau de bord",
    to: "/sdpf",
  },
];

function LayoutSdpf(props) {
  const { children, hasNavigation = true } = props;

  let links = navigationLinks;

  return (
    <>
      <Box sx={{ position: "relative", "z-index": "1000" }}>
        <Box sx={{ bg: "white" }}>
          <Header
            dropDownLinks={[
              {
                title: "Vos informations",
                to: "/sdpf/informations",
              },
              {
                title: "Gestion des comptes",
                to: "/sdpf/members",
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
        <Footer />
      </Box>
    </>
  );
}

export { LayoutSdpf };
