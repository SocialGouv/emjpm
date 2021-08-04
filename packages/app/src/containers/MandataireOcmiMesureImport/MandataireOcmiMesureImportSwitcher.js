import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation } from "@apollo/client";

import { Box, Flex } from "rebass";
import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import { Text, Switch, Button } from "~/components";

import { SYNC_OCMI_ENABLE, IMPORT_OCMI_MESURES } from "./mutations";
import { toast } from "react-toastify";
import useQueryReady from "~/hooks/useQueryReady";

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
  const [importOcmiMesures, { loading: loading1, error: error1 }] =
    useMutation(IMPORT_OCMI_MESURES);
  useQueryReady(loading1, error1);

  const importMesures = useCallback(async () => {
    try {
      await importOcmiMesures({
        awaitRefetchQueries: true,
        refetchQueries: ["CURRENT_USER_QUERY", "MESURES_QUERY"],
      });
      toast.success("Import réalisé avec succès");
    } catch (e) {
      if (e.message.startsWith("cannot acquire lock")) {
        toast.warn("Un import est déjà en cours");
      } else {
        console.log("importOcmiMesures error", e);
      }
    }
  }, [importOcmiMesures]);

  const [syncOCMIEnable, { loading: loading2, error: error2 }] = useMutation(
    SYNC_OCMI_ENABLE,
    {
      onCompleted: async () => {
        if (syncEnabled) {
          toast.success("Synchronisation activée, import en cours...");
          await importMesures();
        } else {
          toast.success("Synchronisation désactivée");
        }
      },
      refetchQueries: ["CURRENT_USER_QUERY"],
    }
  );
  useQueryReady(loading2, error2);

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
    await importMesures();
  };

  return (
    <Flex m={2} flexDirection="column">
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
            {`Pour activer la synchronisation automatique journalière et importer vos mesures de votre compte OCMI dans votre compte eMJPM, activer le bouton ci-dessus.`}
          </Text>
        </Box>
      )}
      {syncEnabled && (
        <>
          <Box mb={2}>
            <Text mb="1" lineHeight="2">
              <StyledCheckCircleOutline size={18} />
              {`Votre compte eMJPM est synchronisé avec votre compte OCMI, une mise à jour des données d'eMJPM s'effectuera chaque nuit.`}
            </Text>
          </Box>
          <Box mb={2}>
            <Text mb="1" lineHeight="2">
              <StyledWarning size={18} />
              {`Toutes les mesures de votre compte eMJPM seront mise à jour et les données de celles-ci remplacées par celles des mesures correspondantes de votre compte OCMI lors de chaque synchronisation. En activant cette option vos mesures ne seront pas modifiables sur eMJPM.`}
            </Text>
          </Box>
        </>
      )}
      {syncEnabled || (
        <Box>
          <Box mb={50}>
            <Text mb="1" lineHeight="2">
              {`Vous avez également l'option d'importer vos mesures depuis OCMI en cliquant sur le bouton ci-dessous.`}
            </Text>
            <Text mb="1" lineHeight="2">
              {`Vous pourrez ensuite modifier vos mesures dans eMJPM.`}
            </Text>
            <Box mb={2}>
              <Text mb="1" lineHeight="2">
                <StyledWarning size={18} />
                {`La mise à jour des mesures se fait à partir de la correspondance avec le Numéro RG le le SIRET du tribunal, veillez à ce que ces informations soient correctement renseignées et correspondent entre OCMI et eMJPM.`}
              </Text>
            </Box>
            <Flex justifyContent="center">
              <Button onClick={importMesuresNow}>Importer maintenant</Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Flex>
  );
}

export default MandataireOcmiMesureImportSwitcher;
