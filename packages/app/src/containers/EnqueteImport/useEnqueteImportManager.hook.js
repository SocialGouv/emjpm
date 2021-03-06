import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import {
  ENQUETE,
  ENQUETE_WITH_REPONSE_STATUS,
} from "~/containers/Enquete/queries";
import { UPLOAD_ENQUETE_EXCEL_FILE } from "~/containers/EnqueteImport/mutations";
import { fileReader } from "~/utils/std/fileReader";
import useQueryReady from "~/hooks/useQueryReady";

function useEnqueteImportManager({ enqueteId, userId }) {
  const [importSummary, setImportSummary] = useState();
  const [
    uploadFile,
    { loading: enqueteImportLoading, error: enqueteImportError },
  ] = useMutation(UPLOAD_ENQUETE_EXCEL_FILE);
  useQueryReady(enqueteImportLoading, enqueteImportError);

  const {
    data: enqueteData,
    loading: enqueteLoading,
    error: enqueteError,
  } = useQuery(ENQUETE, {
    variables: { id: enqueteId },
  });
  const enquete = enqueteData ? enqueteData.enquetes_by_pk : undefined;

  const {
    data: enqueteReponseData,
    loading: enqueteReponseLoading,
    error: enqueteReponseError,
  } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });
  const enqueteReponse = enqueteReponseData
    ? enqueteReponseData.enquete_reponse_validation_status
    : undefined;

  async function importEnqueteFile(file) {
    if (!file) {
      return;
    }
    fileReader.readBinaryFileAsBase64(file, async ({ content }) => {
      try {
        const res = await uploadFile({
          variables: {
            content,
            enqueteId,
            userId,
          },
        });
        const {
          data: {
            upload_enquete_file: { data },
          },
        } = res;
        const importSummary = JSON.parse(data);
        setImportSummary(importSummary);
      } catch (error) {
        setImportSummary({
          unexpectedError: true,
        });
      }
    });
  }

  function reset() {
    setImportSummary(undefined);
  }

  return {
    enquete,
    enqueteReponse,
    error: enqueteReponseError || enqueteError,
    importEnqueteFile,
    importSummary,
    loading: enqueteReponseLoading || enqueteLoading,
    reset,
    uploading: enqueteImportLoading,
  };
}

export { useEnqueteImportManager };
