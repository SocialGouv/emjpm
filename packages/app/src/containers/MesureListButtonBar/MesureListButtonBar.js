import { Box, Flex } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { MesureExportExcelButton } from "~/containers/MesureExportExcelButton";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";

import { SYNC_OCMI_DISABLED_MESSAGE } from "~/constants/mesures";

function MesureListButtonBar() {
  const user = useUser();
  const { type } = user;
  const mesureModificationDisabled = user.mandataire?.sync_ocmi_enable;

  const path = getUserBasePath({ type });

  const mesureModificationButtonProps = mesureModificationDisabled
    ? {
        disabled: true,
        title: SYNC_OCMI_DISABLED_MESSAGE,
      }
    : {};

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton
            {...mesureModificationButtonProps}
            to={`${path}/add-mesures`}
          >
            Ajouter une mesure
          </LinkButton>
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
