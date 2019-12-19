import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMagistratMap } from "../../src/components/Layout";
import { MagistratMapMandataires } from "../../src/components/MagistratMapMandataires";
import { MapContextProvider } from "../../src/components/MagistratMapMandataires/context";
import { MagistratMapMandatairesPanelList } from "../../src/components/MagistratMapMandatairesPanelList";
import { withAuthSync } from "../../src/util/auth";

const Map = () => {
  return (
    <LayoutMagistratMap>
      <MapContextProvider>
        <Flex
          sx={{
            height: "100%",
            position: "absolute",
            pt: "115px",
            top: "0",
            width: "100%"
          }}
        >
          <Box height="100%" flex="0 1 auto" width="600px">
            <MagistratMapMandatairesPanelList />
          </Box>
          <Box height="100%" flex="1 1 auto">
            <MagistratMapMandataires />
          </Box>
        </Flex>
      </MapContextProvider>
    </LayoutMagistratMap>
  );
};

export default withAuthSync(Map);
