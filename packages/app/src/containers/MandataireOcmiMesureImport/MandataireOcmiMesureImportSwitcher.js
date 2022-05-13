import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation } from "@apollo/client";

import { Box, Flex } from "rebass";
import { Warning } from "@styled-icons/entypo/Warning";
import { CheckCircleOutline } from "@styled-icons/material/CheckCircleOutline";
import styled from "styled-components";

import { Text, Switch, Button, Heading } from "~/components";

import { SYNC_OCMI_ENABLE, IMPORT_OCMI_MESURES } from "./mutations";
import { toast } from "react-toastify";
import useQueryReady from "~/hooks/useQueryReady";
import MesureImportDeleteAll from "~/containers/MesureImportDeleteAll";

const StyledCheckCircleOutline = styled(CheckCircleOutline)`
  margin-right: 10px;
  color: green;
`;
const StyledWarning = styled(Warning)`
  margin-right: 10px;
  color: #df1400;
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
      const { data } = await importOcmiMesures({
        awaitRefetchQueries: true,
        refetchQueries: ["CURRENT_USER_QUERY", "MESURES_QUERY"],
      });
      for (const json of data.import_ocmi_mesures.errors) {
        const error = JSON.parse(json);
        switch (error.type) {
          case "doublons":
            toast.warn(
              "Votre import contient " +
                error.count +
                " doublon" +
                (error.count > 1 ? "s" : "") +
                ", il est possible que vous perdiez des données lors de l'import, veillez à n'avoir qu'un Numéro RG unique par mesure et par tribunal."
            );
            toast.warn(
              "Les numéros RG de vos doublons sont: " +
                error.doublons
                  .map((doublon) => doublon.split(".")[0])
                  .join(",\n"),
              { autoClose: false }
            );
            break;
        }
      }
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
      <Heading size={3} mb="3">
        Synchronisez vos mesures
      </Heading>
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
        </>
      )}
      <Box mb={2}>
        <Text mb="1" lineHeight="2">
          {`La mise à jour des mesures se fait à partir de la correspondance avec le numéro RG et le SIRET du tribunal. Si une correspondance est trouvée entre OCMI et eMJPM leur données seront mis à jour, sinon la mesure sera créée.`}
        </Text>
        <Text mb="1" lineHeight="2">
          <StyledWarning size={18} />
          {`En activant cette option vos mesures ne seront pas modifiables sur eMJPM.`}
        </Text>
      </Box>

      <Box mt={20} mb={20}>
        <Heading size={3} mb="1">
          Supprimez vos mesures
        </Heading>
        <MesureImportDeleteAll />
        <Text mt="3" mb="1" lineHeight="2">
          {`A la suite de cette manipulation vous pouvez réimporter vos mesures. Pour cela, vous pouvez vous référer à la section suivante.`}
        </Text>
      </Box>

      <Box mb={20}>
        <Heading size={3} mb="1">
          Déclenchez manuellement l'import des mesures
        </Heading>
        <Box>
          <Text mb="1" lineHeight="2">
            {`Vous pouvez déclencher l’import de vos mesures depuis OCMI en cliquant sur le bouton ci-dessous.`}
          </Text>
          {syncEnabled || (
            <Text mb="1" lineHeight="2">
              {`Vous pourrez ensuite modifier vos mesures dans eMJPM.`}
            </Text>
          )}
          <Flex justifyContent="center">
            <Button
              onClick={importMesuresNow}
              title="Importer maintenant"
              aria-label="Importer maintenant"
            >
              Importer maintenant
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default MandataireOcmiMesureImportSwitcher;
