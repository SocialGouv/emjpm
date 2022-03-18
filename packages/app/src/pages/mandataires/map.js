import { useState } from "react";
import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataireMap } from "~/containers/Layout";
import { MandataireMapPanelMesures } from "~/containers/MandataireMapPanelMesures";

import { MandataireMap } from "~/containers/MandataireMap";

function Map() {
  const [selectedMesuresIds, setSelectedMesuresIds] = useState([]);
  return (
    <>
      <Helmet>
        <title>La carte des mandataires | e-MJPM</title>
      </Helmet>

      <LayoutMandataireMap>
        <Flex
          sx={{
            height: "100%",
            position: "absolute",
            pt: "155px",
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
              <MandataireMapPanelMesures mesuresIds={selectedMesuresIds} />
            </Box>
          ) : null}
          <Box
            height="100%"
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
            }}
            id="mandataire_map"
            tabIndex="-1"
          >
            <MandataireMap
              selectMesures={(ids) => setSelectedMesuresIds(ids)}
              selectedMesuresIds={selectedMesuresIds}
            />
          </Box>
        </Flex>
      </LayoutMandataireMap>
    </>
  );
}

export default Map;
