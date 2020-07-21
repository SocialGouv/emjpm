import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useState } from "react";

import { fileReader } from "../../util/fileReader";
import { UPLOAD_MESURES_EXCEL_FILE } from "../MesureImport/mutations";

function useMesureImportManager({ mandataireUserId, serviceId }) {
  const [importSummary, setImportSummary] = useState();
  const [file, setFile] = useState();
  const [uploadFile, { loading: mesuresImportLoading }] = useMutation(UPLOAD_MESURES_EXCEL_FILE);
  const apolloClient = useApolloClient();

  function importMesureFileWithAntennesMap(antennesMap) {
    launchImport({ file, antennesMap });
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
        variables: {
          content,
          name,
          serviceId,
          antennesMap: antennesMap ? JSON.stringify(antennesMap) : undefined,
          type,
          mandataireUserId,
        },
      })
        .then(
          ({
            data: {
              upload_mesures_file: { data },
            },
          }) => {
            apolloClient.clearStore();
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
