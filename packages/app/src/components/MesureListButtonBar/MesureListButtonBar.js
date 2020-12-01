import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "~/components/Commons";
import { MesureExportExcelButton } from "~/components/MesureExportExcelButton";
import { UserContext } from "~/components/UserContext";
import { getUserBasePath } from "~/constants";

const MesureListButtonBar = () => {
  const { type, mandataire = {} } = useContext(UserContext);
  const { lb_user = {} } = mandataire;
  const { ocmi_mandataire } = lb_user;

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
        {ocmi_mandataire && <MesureImportOcmiButton ml={1} />}
        <MesureExportExcelButton ml={1} mr={2} />
      </Flex>
    </Box>
  );
};

export { MesureListButtonBar };
