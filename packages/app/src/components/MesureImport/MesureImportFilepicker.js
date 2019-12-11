import { Input } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { csvToJson, xlsToJson } from "../../util/import";

const MesureImportFilepicker = props => {
  const { handleChange } = props;

  const onFileChange = event => {
    const [file] = event.target.files;
    const reader = new FileReader();
    const isExcel = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

    reader.onload = () => {
      const { result } = reader;
      const data = isExcel ? xlsToJson(result) : csvToJson(result);

      handleChange({ data, file });
    };

    if (isExcel) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <Box mb="2">
      <Input
        id="file"
        type="file"
        name="file"
        value=""
        onChange={onFileChange}
        placeholder="Sélectionner votre fichier excel ou csv"
      />
    </Box>
  );
};

export { MesureImportFilepicker };
