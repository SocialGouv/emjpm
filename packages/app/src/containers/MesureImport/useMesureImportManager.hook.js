import { useMutation } from "@apollo/client";
import { useState } from "react";

import { UPLOAD_MESURES_EXCEL_FILE } from "~/containers/MesureImport/mutations";
import { fileReader } from "~/utils/std/fileReader";
import useQueryReady from "~/hooks/useQueryReady";

function useMesureImportManager({ mandataireUserId, serviceId }) {
  const [importSummary, setImportSummary] = useState();
  const [file, setFile] = useState();
  const [
    uploadFile,
    { loading: mesuresImportLoading, error: mesuresImportError },
  ] = useMutation(UPLOAD_MESURES_EXCEL_FILE);
  useQueryReady(mesuresImportLoading, mesuresImportError);

  function importMesureFileWithAntennesMap(antennesMap) {
    launchImport({ antennesMap, file });
  }

  function importMesureFile(file) {
    setFile(file);
    launchImport({ file });
  }

  function readFile(file, cb, err) {
    if (file) {
      const isExcel = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

      if (isExcel) {
        fileReader.readBinaryFileAsBase64(file, cb, err);
      } else {
        fileReader.readTextFile(file, cb, err);
      }
    }
  }

  function launchImport({ file, antennesMap }) {
    readFile(file, ({ file, content }) => {
      const { name, type } = file;
      uploadFile({
        refetchQueries: ["CURRENT_USER_QUERY", "MESURES_QUERY"],
        variables: {
          antennesMap: antennesMap ? JSON.stringify(antennesMap) : undefined,
          content,
          mandataireUserId,
          name,
          serviceId,
          type,
        },
      })
        .then(
          ({
            data: {
              upload_mesures_file: { data },
            },
          }) => {
            const importSummary = JSON.parse(data);
            setImportSummary(importSummary);
          }
        )
        .catch(() => {
          setImportSummary({
            unexpectedError: true,
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
    reset,
  };
}

export { useMesureImportManager };
