import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";

import { csvToJson, validateImportData, xlsToJson } from "../../util/import/index";
import { MandataireMesureImportFilepicker } from "./MandataireMesureImportFilepicker";
import { MandataireMesureImportResult } from "./MandataireMesureImportResult";
import { ADD_IMPORT } from "./mutations";

export const MandataireAddMesureImport = props => {
  const { userId } = props;
  const [result, setResult] = useState(null);
  const [addImport] = useMutation(ADD_IMPORT);

  const handleFileChosen = file => {
    const reader = new FileReader();
    const filename = file.name;
    const isExcel = filename.endsWith(".xls") || filename.endsWith(".xlsx");

    reader.onload = function() {
      const { result } = reader;
      const data = isExcel ? xlsToJson(result) : csvToJson(result);
      const { errors, mesures } = validateImportData(data);

      if (mesures.length) {
        if (userId) {
          addImport({
            variables: {
              content: mesures,
              file_name: file.name,
              file_size: file.size,
              file_type: file.type,
              user_id: parseInt(userId)
            }
          });
        } else {
          addImport({
            variables: {
              content: mesures,
              file_name: file.name,
              file_size: file.size,
              file_type: file.type
            }
          });
        }
      }

      setResult({ errors, mesures });
    };

    if (isExcel) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  if (result) {
    return <MandataireMesureImportResult reset={() => setResult(null)} result={result} />;
  }

  return <MandataireMesureImportFilepicker handleFileChosen={handleFileChosen} />;
};
