import React, { useContext } from "react";
import { Box } from "rebass";

import { MapContext } from "../MagistratMandatairesMap/context";
import { MagistratMapMandataireList } from "../MagistratMapMandataireList";
import { MagistratMandatairesMapPanelStyle } from "./style";

const MagistratMandatairesMapPanel = props => {
  const { tiId } = props;

  const { currentGestionnaire, setCenter, setMesures, setcurrentGestionnaire } = useContext(
    MapContext
  );

  console.log(currentGestionnaire, setCenter, setMesures, setcurrentGestionnaire);
  return (
    <Box sx={MagistratMandatairesMapPanelStyle} {...props}>
      <MagistratMapMandataireList tiId={tiId} />
    </Box>
  );
};

export { MagistratMandatairesMapPanel };
