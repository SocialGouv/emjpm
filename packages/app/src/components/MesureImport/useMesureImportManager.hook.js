import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { UPLOAD_MESURES_EXCEL_FILE } from "../MesureImport/mutations";
import { fileReader } from "./fileReader";

function useMesureImportManager({ mandataireUserId, serviceId }) {
  const [importSummary, setImportSummary] = useState();
  const [file, setFile] = useState();
  const [uploadFile, { loading: mesuresImportLoading }] = useMutation(UPLOAD_MESURES_EXCEL_FILE);

  function importMesureFileWithAntennesMap(antennesMap) {
    launchImport({ file, antennesMap });
  }

  function importMesureFile(file) {
    setFile(file);
    launchImport({ file });
  }

  function launchImport({ file, antennesMap }) {
    fileReader.readFileAsBinaryString(file, ({ file, base64str }) => {
      const { name, type } = file;
      uploadFile({
        variables: {
          base64str,
          name,
          serviceId,
          antennesMap: antennesMap ? JSON.stringify(antennesMap) : undefined,
          type,
          mandataireUserId
        }
      })
        .then(
          ({
            data: {
              upload_mesures_file: { data }
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
    importMesureFile,
    importMesureFileWithAntennesMap,
    importSummary,
    mesuresImportLoading,
    reset
  };
}

export { useMesureImportManager };
