import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataireMap } from "../../src/components/Layout";
import { MapContextProvider } from "../../src/components/MandataireMap/context";
import { MandataireMapPanelMesures } from "../../src/components/MandataireMapPanelMesures";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";

const MandataireMap = dynamic(
  () => import("../../src/components/MandataireMap").then(mod => mod.MandataireMap),
  { ssr: false }
);

const Map = () => {
  const {
    mandataire: { longitude, latitude }
  } = useContext(UserContext);

  return (
    <MapContextProvider longitude={longitude} latitude={latitude}>
      <LayoutMandataireMap>
        <Flex sx={{ height: "100%", position: "absolute", pt: "115px", top: "0", width: "100%" }}>
          <Box
            sx={{
              flexBasis: 600,
              flexGrow: 1
            }}
          >
            <MandataireMapPanelMesures />
          </Box>
          <Box
            height="100%"
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320
            }}
          >
            <MandataireMap />
          </Box>
        </Flex>
      </LayoutMandataireMap>
    </MapContextProvider>
  );
};

export default withAuthSync(Map);
