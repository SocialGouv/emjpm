import { Box, Flex } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { MesureExportExcelButton } from "~/containers/MesureExportExcelButton";
import useUser from "~/hooks/useUser";
import useMesuresLocked from "~/hooks/useMesuresLocked";
import { getUserBasePath } from "~/constants";

function MesureListButtonBar() {
  const user = useUser();
  const { type } = user;

  const { locked, lockedByEditor, message } = useMesuresLocked();

  const path = getUserBasePath({ type });

  const mesureModificationButtonProps = locked
    ? {
        disabled: true,
        title: message,
        "aria-label": message,
      }
    : {};

  return (
    <Box>
      <Flex flexDirection="row">
        <Box>
          <LinkButton
            to={`${path}/add-mesures`}
            title="Ajouter une mesure"
            aria-label="Ajouter une mesure"
            {...mesureModificationButtonProps}
          >
            Ajouter une mesure
          </LinkButton>
        </Box>
        <Box ml={1}>
          <LinkButton
            to={`${path}/import-mesures`}
            title="Importer vos mesures"
            aria-label="Importer vos mesures"
            {...(lockedByEditor ? mesureModificationButtonProps : {})}
          >
            Importer vos mesures
          </LinkButton>
        </Box>
        <MesureExportExcelButton
          ml={1}
          mr={2}
          title="Exporter les mesures"
          aria-label="Exporter les mesures"
        />
      </Flex>
    </Box>
  );
}

export { MesureListButtonBar };
