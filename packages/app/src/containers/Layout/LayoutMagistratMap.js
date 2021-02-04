import { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "~/containers/Header";
import { Navigation } from "~/containers/Navigation";
import { BoxWrapper } from "~/components/Grid";

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

function LayoutMagistratMap(props) {
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
    </Fragment>
  );
}

export { LayoutMagistratMap };
