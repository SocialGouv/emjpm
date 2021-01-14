import { useState } from "react";
import { Box, Flex } from "rebass";

import { LayoutServicesMap } from "~/components/Layout";
import { ServiceMapPanelMesures } from "~/components/ServiceMapPanelMesures";

import { ServiceMap } from "~/components/ServiceMap";

function Map() {
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
          <ServiceMap
            selectMesures={(ids) => setSelectedMesuresIds(ids)}
            selectedMesuresIds={selectedMesuresIds}
          />
        </Box>
      </Flex>
    </LayoutServicesMap>
  );
}

export default Map;
