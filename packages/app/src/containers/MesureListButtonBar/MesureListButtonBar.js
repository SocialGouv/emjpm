import { useContext } from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { MesureExportExcelButton } from "~/containers/MesureExportExcelButton";
import { UserContext } from "~/containers/UserContext";
import { getUserBasePath } from "~/constants";

function MesureListButtonBar() {
  const { type } = useContext(UserContext);

  const path = getUserBasePath({ type });

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton to={`${path}/add-mesures`}>Ajouter une mesure</LinkButton>
        </Box>
        <Box ml={1}>
          <LinkButton to={`${path}/import-mesures`}>
            Importer vos mesures
          </LinkButton>
        </Box>
        <MesureExportExcelButton ml={1} mr={2} />
      </Flex>
    </Box>
  );
}

export { MesureListButtonBar };
