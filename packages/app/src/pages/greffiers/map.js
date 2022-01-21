import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutGreffierMap } from "~/containers/Layout";
import { GreffierMandatairesMap } from "~/containers/GreffierMandatairesMap";
import { GreffierMapMandatairesPanelList } from "~/containers/GreffierMapMandatairesPanelList";
import { MapContextProvider } from "~/containers/Map/context";
import useUser from "~/hooks/useUser";

function Map() {
  const { greffier } = useUser();
  const {
    ti: { latitude, longitude },
  } = greffier;
  return (
    <>
      <Helmet>
        <title>La carte des mandataires | e-MJPM</title>
      </Helmet>
      <MapContextProvider latitude={latitude} longitude={longitude}>
        <LayoutGreffierMap>
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
              <GreffierMapMandatairesPanelList />
            </Box>
            <Box height="100%" flex="1 1 auto">
              <GreffierMandatairesMap />
            </Box>
          </Flex>
        </LayoutGreffierMap>
      </MapContextProvider>
    </>
  );
}

export default Map;
