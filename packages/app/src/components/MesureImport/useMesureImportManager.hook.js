import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import { useState } from "react";

import { fileReader } from "../../util/fileReader";
import { UPLOAD_MESURES_EXCEL_FILE } from "../MesureImport/mutations";
import { MESURES_QUERY } from "../MesureList/queries";

function useMesureImportManager({ mandataireUserId, serviceId }) {
  const [importSummary, setImportSummary] = useState();
  const [file, setFile] = useState();
  const [uploadFile, { loading: mesuresImportLoading }] = useMutation(
    UPLOAD_MESURES_EXCEL_FILE
  );

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
        refetchQueries: [
          "CURRENT_USER_QUERY",
          {
            query: MESURES_QUERY,
            variables: {
              antenne: null,
              limit: 20,
              natureMesure: null,
              offset: 0,
              searchText: null,
              status: MESURE_PROTECTION_STATUS.en_cours,
            },
          },
        ],
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
