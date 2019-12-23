import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LayoutServicesMap } from "../../src/components/Layout";
import { MapContextProvider } from "../../src/components/ServiceMap/context";
import { ServiceMapPanelMesures } from "../../src/components/ServiceMapPanelMesures";
import { UserContext } from "../../src/components/UserContext";
import { withAuthSync } from "../../src/util/auth";
const ServiceMap = dynamic(
  () => import("../../src/components/ServicesMap").then(mod => mod.ServiceMap),
  { ssr: false }
);

const Map = () => {
  const { service_admins } = useContext(UserContext);
  const [service_admin] = service_admins;
  const {
    service: { longitude, latitude }
  } = service_admin;

  return (
    <MapContextProvider longitude={longitude} latitude={latitude}>
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
    </MapContextProvider>
  );
};

export default withAuthSync(Map);
