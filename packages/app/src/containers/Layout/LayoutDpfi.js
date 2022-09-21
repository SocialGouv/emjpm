import { Box } from "rebass";

import { Footer } from "~/containers/Footer";
import { Header } from "~/components";
import { Navigation } from "~/containers/Navigation";

import { BoxWrapper } from "~/components/Grid";

const navigationLinks = [
  {
    title: "Tableau de bord",
    to: "/dpfi",
  },
];

function LayoutDpfi(props) {
  const { children, hasNavigation = true } = props;

  let links = navigationLinks;

  return (
    <>
      <Box sx={{ position: "relative", "z-index": "1000" }}>
        <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
          <Header
            dropDownLinks={[
              { title: "Vos informations", to: "/dpfi/informations" },
            ]}
          />
          {hasNavigation && (
            <BoxWrapper>
              <Navigation links={links} />
            </BoxWrapper>
          )}
        </Box>
        <Box>{children}</Box>
        <Footer />
      </Box>
    </>
  );
}

export { LayoutDpfi };
