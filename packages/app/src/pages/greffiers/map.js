import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutGreffierMap } from "~/containers/Layout";
import { MagistratMandatairesMap } from "~/containers/MagistratMandatairesMap";
import { GreffierMapMandatairesPanelList } from "~/containers/GreffierMapMandatairesPanelList";
import { MapContextProvider } from "~/containers/Map/context";
import useUser from "~/hooks/useUser";
import { SkipToContent } from "~/components";

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

      <SkipToContent skipTo="greffier_mandataires_list" />
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
              <MagistratMandatairesMap />
            </Box>
          </Flex>
        </LayoutGreffierMap>
      </MapContextProvider>
    </>
  );
}

export default Map;
