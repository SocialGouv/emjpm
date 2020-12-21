import React, { Fragment } from "react";
import { Box } from "rebass";

import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { BoxWrapper } from "~/ui";

const navigationLinks = [
  {
    title: "Vos mandataires",
    url: "/magistrats",
  },
  {
    title: "La carte des mandataires",
    url: "/magistrats/map",
  },
  {
    title: "Vos mesures",
    url: "/magistrats/mesures",
  },
];

const LayoutMagistratMap = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header
          {...props}
          dropDownLinks={[
            { title: "Vos informations", url: "/magistrats/informations" },
          ]}
        />
        <BoxWrapper>
          <Navigation links={navigationLinks} />
        </BoxWrapper>
      </Box>
      {children}
    </Fragment>
  );
};

export { LayoutMagistratMap };
