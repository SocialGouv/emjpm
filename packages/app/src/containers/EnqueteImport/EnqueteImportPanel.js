import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import { useEffect } from "react";
import { Box, Flex, Text } from "rebass";
import { useApolloClient } from "@apollo/client";

import useQueryReady from "~/hooks/useQueryReady";
import menuStepperStyle from "~/containers/Enquete/EnqueteCommon/EnqueteMenuStepper/style";
import { HeadingTitle } from "~/containers/HeadingTitle";

import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useEnqueteImportManager } from "./useEnqueteImportManager.hook";

const textStyle = {
  lineHeight: "30px",
  textAlign: "center",
};

export function EnqueteImportPanel(props) {
  const { enqueteId, userId, goToStep } = props;

  const {
    importEnqueteFile,
    importSummary,
    loading,
    uploading,
    enqueteReponse,
    error,
  } = useEnqueteImportManager({
    enqueteId,
    userId,
  });

  const apolloClient = useApolloClient();

  const status = enqueteReponse?.status;
  useEffect(() => {
    if (status && status !== "draft") {
      goToStep(enqueteId, { step: 0, subtep: 0 });
    }
  }, [status, enqueteId, goToStep]);

  useEffect(() => {
    if (importSummary && !importSummary.unexpectedError) {
      // reset cache after import
      apolloClient.resetStore();
      goToStep(enqueteId, { step: 1, substep: 0 });
    }
  }, [importSummary, enqueteId, goToStep, apolloClient]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  if (uploading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez
        patienter...
      </Box>
    );
  }

  return (
    <Flex id="import_mesure">
      <Box py={"50px"} px={4} sx={menuStepperStyle.menu}>
        <Box>{renderSectionTitle(enqueteId, goToStep)}</Box>
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <Flex flexDirection="column" mb="5">
          <HeadingTitle textAlign="center">Import des données</HeadingTitle>
          <Flex flexDirection="column" mt="4" mb="3" sx={textStyle}>
            <Text>
              {`Vous pouvez sélectionner le tableur excel envoyé par votre direction départementale
              pour importer les données de l'enquête.`}
            </Text>
          </Flex>
          {importSummary && importSummary.unexpectedError && (
            <Box mt={2} mb={2}>
              Erreur inatendue. Veuillez ré-essayer.
            </Box>
          )}
          {enqueteReponse &&
            enqueteReponse.enquete_reponse_validation_status &&
            enqueteReponse.enquete_reponse_validation_status.global !==
              "empty" && (
              <Box mt={2} mb={2} fontWeight="bold">
                Attention, les données déjà renseignée seront écrasées.
              </Box>
            )}
          <SingleImportFilePicker
            placeholder="Cliquez ici pour sélectionner votre fichier excel"
            onFileChosen={(file) => importEnqueteFile(file)}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

function renderSectionTitle(enqueteId, goToStep) {
  return (
    <>
      <Flex
        sx={{
          color: "#0072ca",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        alignItems="center"
        onClick={() => goToStep(enqueteId, { step: 1, substep: 0 })}
      >
        <Flex
          sx={{
            ...menuStepperStyle.menuTag,
            border: "2px solid #0072ca",
          }}
        >
          <Text>{"<"}</Text>
        </Flex>

        <Text ml={3}>{"Retour à l'enquête"}</Text>

        <Box display="flex" flexGrow={1} />
      </Flex>
    </>
  );
}
