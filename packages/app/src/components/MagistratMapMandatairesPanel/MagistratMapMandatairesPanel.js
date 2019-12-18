import React, { useContext } from "react";
import { Box } from "rebass";

import { MapContext } from "../MagistratMapMandataires/context";
import { MagistratMapMandatairesPanelList } from "../MagistratMapMandatairesPanelList";
import { MagistratMapMandatairesPanelProfile } from "../MagistratMapMandatairesPanelProfile";
import { UserContext } from "../UserContext";
import { MagistratMapMandatairesPanelStyle } from "./style";

const MagistratMapMandatairesPanel = props => {
  const {
    magistrat: { ti_id: tiId }
  } = useContext(UserContext);

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
