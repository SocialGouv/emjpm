import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { getUserBasePath } from "../../constants";
import { LinkButton } from "../Commons";
import { MesureExportExcelButton } from "../MesureExportExcelButton";
import { UserContext } from "../UserContext";

const MesureListButtonBar = () => {
  const { type } = useContext(UserContext);

  const path = getUserBasePath({ type });

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton href={`${path}/add-mesures`}>
            Ajouter une mesure
          </LinkButton>
        </Box>
        <Box ml={1}>
          <LinkButton href={`${path}/import-mesures`}>
            Importer vos mesures
          </LinkButton>
        </Box>
        <MesureExportExcelButton ml={1} mr={2} />
      </Flex>
    </Box>
  );
};

export { MesureListButtonBar };
