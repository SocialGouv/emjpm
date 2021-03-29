import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation } from "@apollo/client";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import { useHistory } from "react-router-dom";

import { Box, Flex } from "rebass";
import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import { MESURES_QUERY } from "~/containers/MesureList/queries";
import { Text, Switch, Button } from "~/components";

import { SYNC_OCMI_ENABLE, IMPORT_OCMI_MESURES } from "./mutations";
import { SYNC_OCMI_ENABLED } from "./queries";
import { toast } from "react-toastify";

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

  const importMesures = useCallback(async () => {
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
        try {
          await importMesures();
          toast.success(
            "Synchronisation activée et import réalisé avec succès"
          );
        } catch (e) {
          toast.error("Une erreur s'est produite");
        }
      } else {
        toast.success("Synchronisation désactivée");
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
  }, [importMesures, mandataireId, syncEnabled, syncOCMIEnable]);

  const importMesuresNow = async () => {
    try {
      await importMesures();
      toast.success("Import réalisé avec succès");
    } catch (e) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <Flex flexDirection="column">
      <Box m={2}>
        <Box mb={50}>
          <Text mb="1" lineHeight="2">
            {`Pour importer maintenant vos mesures de votre compte OCMI dans votre compte eMJPM, activer le bouton ci-dessous.`}
          </Text>
          <Text mb="1" lineHeight="2">
            {`Vous pourrez ensuite modifier vos mesures dans eMJPM.`}
          </Text>
          <Text mb="1" lineHeight="2">
            <StyledWarning size={18} />
            {`Toutes les mesures de votre compte eMJPM seront définitivement supprimées et remplacées par les mesures de votre compte OCMI.`}
          </Text>
          <Flex justifyContent="center">
            <Button onClick={importMesuresNow}>Importer maintenant</Button>
          </Flex>
        </Box>

        <Flex justifyContent="left">
          <Box mb={2}>
            <Switch
              name="sync-ocmi"
              onChange={onChangeSyncEnabled}
              isChecked={syncEnabled}
              label={"Synchroniser automatiquement mes mesures avec OCMI"}
            />
          </Box>
        </Flex>
        {syncEnabled || (
          <Box>
            <Text mb="1" lineHeight="2">
              {`Pour activer la synchronisation automatique et importer vos mesures de votre compte OCMI dans votre compte eMJPM, activer le bouton ci-dessus.`}
            </Text>
          </Box>
        )}
        {syncEnabled && (
          <Box mb={2}>
            <Text mb="1" lineHeight="2">
              <StyledCheckCircleOutline size={18} />
              {`Votre compte eMJPM est synchronisé avec votre compte OCMI, une mise à jour des données d'eMJPM s'effectuera chaque nuit.`}
            </Text>
          </Box>
        )}
        <Box mb={2}>
          <Text mb="1" lineHeight="2">
            <StyledWarning size={18} />
            {`Toutes les mesures de votre compte eMJPM seront définitivement supprimées et remplacées par les mesures de votre compte OCMI lors de chaque synchronisation. N'activez pas cette option si vous comptez modifier vous même vos mesures, vos modifications seraient perdues lors de chaque synchronisation.`}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default MandataireOcmiMesureImportSwitcher;
