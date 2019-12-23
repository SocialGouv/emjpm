import dynamic from "next/dynamic";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataireMap } from "../../src/components/Layout";
import { MandataireMapPanelMesures } from "../../src/components/MandataireMapPanelMesures";
import { withAuthSync } from "../../src/util/auth";

const MandataireMap = dynamic(
  () => import("../../src/components/MandataireMap").then(mod => mod.MandataireMap),
  { ssr: false }
);

const Map = () => {
  return (
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
  );
};

export default withAuthSync(Map);
