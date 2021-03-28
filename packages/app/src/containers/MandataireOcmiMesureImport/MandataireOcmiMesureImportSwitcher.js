import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation } from "@apollo/client";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import { useHistory } from "react-router-dom";

import { Box, Flex } from "rebass";
import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import { MESURES_QUERY } from "~/containers/MesureList/queries";
import { Text, Switch } from "~/components";

import { SYNC_OCMI_ENABLE, IMPORT_OCMI_MESURES } from "./mutations";
import { SYNC_OCMI_ENABLED } from "./queries";

const StyledCheckCircleOutline = styled(CheckCircleOutline)`
  margin-right: 10px;
  color: green;
`;
const StyledWarning = styled(Warning)`
  margin-right: 10px;
  color: orange;
`;

function MandataireOcmiMesureImportSwitcher({
  syncEnableOrigin,
  mandataireId,
}) {
  const history = useHistory();

  const [importOcmiMesures] = useMutation(IMPORT_OCMI_MESURES);

  const importMesure = useCallback(async () => {
    try {
      await importOcmiMesures({
        awaitRefetchQueries: true,
        refetchQueries: [
          "CURRENT_USER_QUERY",
          {
            query: MESURES_QUERY,
            variables: {
              antenne: null,
              limit: 20,
              natureMesure: null,
              offset: 0,
              searchText: null,
              status: MESURE_PROTECTION_STATUS.en_cours,
            },
          },
        ],
      });
    } catch (e) {
      console.log("importOcmiMesures error", e);
    }
  }, [importOcmiMesures]);

  const [syncOCMIEnable] = useMutation(SYNC_OCMI_ENABLE, {
    onCompleted: async () => {
      if (syncEnabled) {
        await importMesure();
      }
    },
    refetchQueries: [
      {
        query: SYNC_OCMI_ENABLED,
        variables: {
          mandataireId,
        },
      },
    ],
  });

  const [syncEnabled, setSyncEnabled] = useState(!!syncEnableOrigin);
  const onChangeSyncEnabled = (e) => {
    setSyncEnabled(!syncEnabled);
  };

  const syncEnabledRef = useRef(syncEnabled);
  useEffect(() => {
    if (syncEnabledRef.current === syncEnabled) {
      return;
    }
    syncEnabledRef.current = syncEnabled;
    syncOCMIEnable({
      variables: {
        enable: syncEnabled,
        mandataireId,
      },
    });
  }, [importMesure, mandataireId, syncEnabled, syncOCMIEnable]);

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="left">
        <Box mb={2} p={1}>
          <Switch
            name="sync-ocmi"
            onChange={onChangeSyncEnabled}
            isChecked={syncEnabled}
            label={"Synchroniser mes mesures avec OCMI"}
          />
        </Box>
      </Flex>
      {syncEnabled || (
        <Box mb={2} p={1}>
          <Text mb="1" lineHeight="2">
            {`Pour importer vos mesures de votre compte OCMI dans votre compte eMJPM, activer le bouton ci-dessus.`}
          </Text>
          <Text mb="1" lineHeight="2">
            <StyledWarning size={18} />
            {`Toutes les mesures de votre compte eMJPM seront définitivement supprimées et remplacées par les mesures de votre compte OCMI.`}
          </Text>
        </Box>
      )}
      {syncEnabled && (
        <Box mb={2} p={1}>
          <Text mb="1" lineHeight="2">
            <StyledCheckCircleOutline size={18} />
            {`Votre compte eMJPM est synchronisé avec votre compte OCMI, une mise à jour des données d'eMJPM s'effectuera chaque nuit.`}
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default MandataireOcmiMesureImportSwitcher;
