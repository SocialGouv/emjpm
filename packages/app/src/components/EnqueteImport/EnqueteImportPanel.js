import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useEnqueteImportManager } from "./useEnqueteImportManager.hook";

export const EnqueteImportPanel = ({ enqueteId, userId }) => {
  const router = useRouter();

  const { importEnqueteFile, importSummary, enqueteImportLoading } = useEnqueteImportManager({
    enqueteId,
    userId
  });

  if (enqueteImportLoading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez patienter (cela peut
        prendre jusqu&apos;à 2mn pour les gros fichiers)...
      </Box>
    );
  }

  if (importSummary && !importSummary.unexpectedError) {
    router.push(`/mandataires/enquetes/${enqueteId}`);
  }

  return (
    <Fragment>
      {importSummary && importSummary.unexpectedError && (
        <Box mt={2} mb={2}>
          Erreur innatendue. Veuillez ré-essayer.
        </Box>
      )}
      <SingleImportFilePicker
        placeholder="Sélectionner votre fichier excel"
        onFileChosen={file => importEnqueteFile(file)}
      />
    </Fragment>
  );
};
