import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { UPLOAD_ENQUETE_EXCEL_FILE } from "../EnqueteImport/mutations";
import { fileReader } from "./fileReader";

function useEnqueteImportManager({ enqueteId, mandataireUserId, serviceId }) {
  const [importSummary, setImportSummary] = useState();
  const [uploadFile, { loading: enqueteImportLoading }] = useMutation(UPLOAD_ENQUETE_EXCEL_FILE);

  function importEnqueteFile({ file }) {
    console.log("xxx importEnqueteFile file:", file);
    fileReader.readFileAsBinaryString(file, ({ base64str }) => {
      console.log("xxx readFileAsBinaryString");
      uploadFile({
        variables: {
          base64str,
          serviceId,
          enqueteId,
          mandataireUserId
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
