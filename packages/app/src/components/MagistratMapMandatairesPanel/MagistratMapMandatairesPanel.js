import React, { useContext } from "react";
import { Box } from "rebass";

import { MapContext } from "../MagistratMapMandataires/context";
import { MagistratMapMandatairesPanelList } from "../MagistratMapMandatairesPanelList";
import { MagistratMapMandatairesPanelProfile } from "../MagistratMapMandatairesPanelProfile";
import { MagistratMapMandatairesPanelStyle } from "./style";

const MagistratMapMandatairesPanel = props => {
  const { tiId } = props;

  const {
    currentGestionnaire: { isActive, currentId }
  } = useContext(MapContext);

  return (
    <Box sx={MagistratMapMandatairesPanelStyle} {...props}>
      {isActive ? (
        <MagistratMapMandatairesPanelProfile id={currentId} />
      ) : (
        <MagistratMapMandatairesPanelList tiId={tiId} />
      )}
    </Box>
  );
};

export { MagistratMapMandatairesPanel };
