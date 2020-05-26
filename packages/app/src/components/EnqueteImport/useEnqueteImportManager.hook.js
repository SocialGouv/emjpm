import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { fileReader } from "../../util/fileReader";
import { UPLOAD_ENQUETE_EXCEL_FILE } from "../EnqueteImport/mutations";

function useEnqueteImportManager({ enqueteId, userId }) {
  const [importSummary, setImportSummary] = useState();
  const [uploadFile, { loading: enqueteImportLoading }] = useMutation(UPLOAD_ENQUETE_EXCEL_FILE);

  function readFile(file, cb, err) {
    if (file) {
      fileReader.readBinaryFileAsBase64(file, cb, err);
    }
  }

  function importEnqueteFile(file) {
    readFile(file, ({ content }) => {
      uploadFile({
        variables: {
          content,
          enqueteId,
          userId
        }
      })
        .then(
          ({
            data: {
              upload_enquete_file: { data }
            }
          }) => {
            const importSummary = JSON.parse(data);
            setImportSummary(importSummary);
          }
        )
        .catch(() => {
          setImportSummary({
            unexpectedError: true
          });
        });
    });
  }

  function reset() {
    setImportSummary(undefined);
  }

  return {
    importEnqueteFile,
    importSummary,
    enqueteImportLoading,
    reset
  };
}

export { useEnqueteImportManager };
