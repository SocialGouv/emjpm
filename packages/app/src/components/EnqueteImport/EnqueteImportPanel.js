import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { EnqueteImportResult } from "./EnqueteImportResult";
import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useEnqueteImportManager } from "./useEnqueteImportManager.hook";

export const EnqueteImportPanel = ({
  enqueteId,
  // mandataireUserId & serviceId are mutually exclusive
  mandataireUserId,
  serviceId
}) => {
  const { importEnqueteFile, importSummary, reset, enqueteImportLoading } = useEnqueteImportManager(
    {
      enqueteId,
      mandataireUserId,
      serviceId
    }
  );

  if (enqueteImportLoading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez patienter (cela peut
        prendre jusqu&apos;à 2mn pour les gros fichiers)...
      </Box>
    );
  }

  if (importSummary && !importSummary.unexpectedError) {
    return (
      <EnqueteImportResult
        reset={() => reset()}
        importSummary={importSummary}
        serviceId={serviceId}
      />
    );
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
