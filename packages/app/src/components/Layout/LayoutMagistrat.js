import { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { BoxWrapper } from "~/ui";

const navigationLinks = [
  {
    title: "Vos mandataires",
    to: "/magistrats",
  },
  {
    title: "La carte des mandataires",
    to: "/magistrats/map",
  },
  {
    title: "Vos mesures",
    to: "/magistrats/mesures",
  },
];

function LayoutMagistrat(props) {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          {...props}
          dropDownLinks={[
            { title: "Vos informations", to: "/magistrats/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
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

export { LayoutMagistrat };
