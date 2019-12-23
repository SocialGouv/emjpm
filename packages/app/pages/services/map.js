import dynamic from "next/dynamic";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServicesMap } from "../../src/components/Layout";
import { ServiceMapPanelMesures } from "../../src/components/ServiceMapPanelMesures";
import { withAuthSync } from "../../src/util/auth";
const ServiceMap = dynamic(
  () => import("../../src/components/ServiceMap").then(mod => mod.ServiceMap),
  { ssr: false }
);

const Map = () => {
  return (
    <LayoutServicesMap>
      <Flex sx={{ height: "100%", position: "absolute", pt: "115px", top: "0", width: "100%" }}>
        <Box
          sx={{
            flexBasis: 600,
            flexGrow: 1
          }}
        >
          <ServiceMapPanelMesures />
        </Box>
        <Box
          height="100%"
          sx={{
            flexBasis: 0,
            flexGrow: 99999,
            minWidth: 320
          }}
        >
          <ServiceMap />
        </Box>
      </Flex>
    </LayoutServicesMap>
  );
};

export default withAuthSync(Map);
