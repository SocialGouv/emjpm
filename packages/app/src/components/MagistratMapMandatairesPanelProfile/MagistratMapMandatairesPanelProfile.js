import { Button } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box } from "rebass";

import { MapContext } from "../MagistratMapMandataires/context";
import { MagistratMandatairePanelStyle } from "./style";

const MagistratMapMandatairesPanelProfile = props => {
  // const { currentGestionnaire } = props;
  const { setcurrentGestionnaire } = useContext(MapContext);

  const close = () =>
    setcurrentGestionnaire({
      isActive: false,
      latitude: 48.8534,
      longitude: 2.3488,
      currentId: null,
      currentDiscriminator: null
    });
  return (
    <Box sx={MagistratMandatairePanelStyle} {...props}>
      <Button onClick={() => close()}>Fermer</Button>
      MagistratMandatairePanel
    </Box>
  );
};

export { MagistratMapMandatairesPanelProfile };
