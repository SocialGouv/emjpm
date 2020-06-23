import { useApolloClient } from "@apollo/react-hooks";
import { Heading1 } from "@emjpm/ui";
import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { Box, Flex, Text } from "rebass";

import menuStepperStyle from "../Enquete/EnqueteCommon/EnqueteMenuStepper/style";
import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useEnqueteImportManager } from "./useEnqueteImportManager.hook";

const textStyle = {
  textAlign: "center",
  lineHeight: "30px",
};

export const EnqueteImportPanel = ({ enqueteId, userId }) => {
  const router = useRouter();

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
      router.push("/mandataires/enquetes/[enquete_id]", {
        pathname: `/mandataires/enquetes/${enqueteId}`,
        query: { step: 0, substep: 0 },
      });
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
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez patienter...
      </Box>
    );
  }

  if (importSummary && !importSummary.unexpectedError) {
    // clear cache after import
    apolloClient.clearStore();

    goToFirstStep(router, enqueteId);
  }

  return (
    <Flex>
      <Box py={"50px"} px={4} sx={menuStepperStyle.menu}>
        <Box>{renderSectionTitle(router, enqueteId)}</Box>
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
              Erreur innatendue. Veuillez ré-essayer.
            </Box>
          )}
          {enqueteReponse &&
            enqueteReponse.enquete_reponse_validation_status &&
            enqueteReponse.enquete_reponse_validation_status.global !== "empty" && (
              <Box mt={2} mb={2} fontWeight="bold">
                Attention, les données déjà renseignée seront écrasées.
              </Box>
            )}
          {enqueteReponse && enqueteReponse.status === "draft" && (
            <SingleImportFilePicker
              placeholder="Cliquez ici pour sélectionner votre fichier excel"
              onFileChosen={(file) => importEnqueteFile(file)}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

function goToFirstStep(router, enqueteId) {
  router.push("/mandataires/enquetes/[enquete_id]", {
    pathname: `/mandataires/enquetes/${enqueteId}`,
    query: { step: 1, substep: 0 },
  });
}

function renderSectionTitle(router, enqueteId) {
  return (
    <Fragment>
      <Flex
        sx={{
          color: "#007AD9",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        alignItems="center"
        onClick={() => goToFirstStep(router, enqueteId)}
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
