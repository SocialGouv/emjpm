import { Box, Flex } from "rebass";

import { LayoutMagistratMap } from "~/containers/Layout";
import { MagistratMandatairesMap } from "~/containers/MagistratMandatairesMap";
import { MagistratMapMandatairesPanelList } from "~/containers/MagistratMapMandatairesPanelList";
import { MapContextProvider } from "~/containers/Map/context";
import useUser from "~/hooks/useUser";

function Map() {
  const { magistrat } = useUser();
  const {
    ti: { latitude, longitude },
  } = magistrat;
  return (
    <>
      <Helmet>
        <title>la carte des mandataires | e-MJPM </title>
      </Helmet>
      <MapContextProvider latitude={latitude} longitude={longitude}>
        <LayoutMagistratMap>
          <Flex
            sx={{
              height: "100%",
              position: "absolute",
              pt: "155px",
              top: "0",
              width: "100%",
            }}
          >
            <Box height="100%" flex="0 1 auto" width="600px">
              <MagistratMapMandatairesPanelList />
            </Box>
            <Box height="100%" flex="1 1 auto">
              <MagistratMandatairesMap />
            </Box>
          </Flex>
        </LayoutMagistratMap>
      </MapContextProvider>
    </>
  );
}

export default Map;
