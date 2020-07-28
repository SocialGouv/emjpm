import { LoaderCircle } from "@styled-icons/boxicons-regular/LoaderCircle";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { MesureImportResult } from "./MesureImportResult";
import { SingleImportFilePicker } from "./SingleImportFilePicker";
import { useMesureImportManager } from "./useMesureImportManager.hook";

export const MesureImportPanel = ({
  // mandataireUserId & serviceId are mutually exclusive
  mandataireUserId,
  serviceId,
}) => {
  const {
    importMesureFile,
    importSummary,
    importMesureFileWithAntennesMap,
    reset,
    mesuresImportLoading,
  } = useMesureImportManager({
    mandataireUserId,
    serviceId,
  });

  if (mesuresImportLoading) {
    return (
      <Box p={4}>
        <LoaderCircle size="16" /> Traitement du fichier en cours, veuillez patienter (cela peut
        prendre jusqu&apos;à 2mn pour les gros fichiers)...
      </Box>
    );
  }

  if (importSummary && !importSummary.unexpectedError) {
    return (
      <MesureImportResult
        reset={() => reset()}
        importSummary={importSummary}
        serviceId={serviceId}
        onSubmitAntennesMap={({ antennesMap }) => importMesureFileWithAntennesMap(antennesMap)}
      />
    );
  }

  return (
    <Fragment>
      {importSummary && importSummary.unexpectedError && (
        <Box mt={2} mb={2}>
          Erreur inatendue. Veuillez ré-essayer.
        </Box>
      )}
      <SingleImportFilePicker
        placeholder="Sélectionner votre fichier excel"
        onFileChosen={(file) => importMesureFile(file)}
      />
    </Fragment>
  );
};
