import { useApolloClient } from "@apollo/react-hooks";
import { Heading1 } from "@emjpm/ui";
import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import React, { Fragment, useEffect } from "react";
import { Box, Flex, Text } from "rebass";

import menuStepperStyle from "~/components/Enquete/EnqueteCommon/EnqueteMenuStepper/style";

import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useEnqueteImportManager } from "./useEnqueteImportManager.hook";

const textStyle = {
  lineHeight: "30px",
  textAlign: "center",
};

export const EnqueteImportPanel = (props) => {
  const { enqueteId, userId, goToStep } = props;
  const apolloClient = useApolloClient();

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

  useEffect(() => {
    if (enqueteReponse && enqueteReponse.status !== "draft") {
      goToStep(enqueteId, { step: 0, subtep: 0 });
    }
  });

  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Chargement en cours, veuillez patienter...
      </Box>
    );
  }

  if (uploading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez
        patienter...
      </Box>
    );
  }

  if (importSummary && !importSummary.unexpectedError) {
    // clear cache after import
    apolloClient.clearStore();
    goToStep(enqueteId, { step: 1, substep: 0 });
  }

  return (
    <Flex>
      <Box py={"50px"} px={4} sx={menuStepperStyle.menu}>
        <Box>{renderSectionTitle(enqueteId, goToStep)}</Box>
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <Flex flexDirection="column" mb="5">
          <Heading1 textAlign="center">Import des données</Heading1>
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
};

function renderSectionTitle(enqueteId, goToStep) {
  return (
    <Fragment>
      <Flex
        sx={{
          color: "#007AD9",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        alignItems="center"
        onClick={() => goToStep(enqueteId, { step: 1, substep: 0 })}
      >
        <Flex
          sx={{
            ...menuStepperStyle.menuTag,
            border: "2px solid #007AD9",
          }}
        >
          <Text>{"<"}</Text>
        </Flex>

        <Text ml={3}>{"Retour à l'enquête"}</Text>

        <Box display="flex" flexGrow={1} />
      </Flex>
    </Fragment>
  );
}
