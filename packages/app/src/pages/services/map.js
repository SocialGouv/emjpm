import React, { lazy, Suspense, useState } from "react";
import { Box, Flex } from "rebass";

import { LayoutServicesMap } from "~/components/Layout";
import { ServiceMapPanelMesures } from "~/components/ServiceMapPanelMesures";

const ServiceMap = lazy(() =>
  import("~/components/ServiceMap").then((mod) => mod.ServiceMap)
);

const Map = () => {
  const [selectedMesuresIds, setSelectedMesuresIds] = useState([]);

  return (
    <LayoutServicesMap>
      <Flex
        sx={{
          height: "100%",
          position: "absolute",
          pt: "115px",
          top: "0",
          width: "100%",
        }}
      >
        {selectedMesuresIds.length ? (
          <Box
            sx={{
              flexBasis: 600,
              flexGrow: 1,
            }}
          >
            <ServiceMapPanelMesures mesuresIds={selectedMesuresIds} />
          </Box>
        ) : null}
        <Box
          height="100%"
          sx={{
            flexBasis: 0,
            flexGrow: 99999,
            minWidth: 320,
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ServiceMap
              selectMesures={(ids) => setSelectedMesuresIds(ids)}
              selectedMesuresIds={selectedMesuresIds}
            />
          </Suspense>
        </Box>
      </Flex>
    </LayoutServicesMap>
  );
};

export default Map;
