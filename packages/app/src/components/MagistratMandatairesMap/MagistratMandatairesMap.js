import getConfig from "next/config";
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Box, Flex } from "rebass";

import { MagistratMapMandataireList } from "../MagistratMapMandataireList";
import { MagistratMandatairesMapStyle } from "./style";

const {
  publicRuntimeConfig: { MAPBOX_TOKEN }
} = getConfig();

const MagistratMandatairesMap = props => {
  const { width, height } = props;
  const [currentViewport, setViewport] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  return (
    <Flex>
      <Box>
        <MagistratMapMandataireList />
      </Box>
      <Box sx={MagistratMandatairesMapStyle(width, height)} {...props}>
        <ReactMapGL
          width="100%"
          height="100%"
          {...currentViewport}
          onViewStateChange={({ viewState }) => {
            setViewport({ viewState });
          }}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </Box>
    </Flex>
  );
};

export { MagistratMandatairesMap };
