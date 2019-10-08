import { useMutation } from "@apollo/react-hooks";
import { Button, Input } from "@socialgouv/emjpm-ui-core";
import { Text } from "@socialgouv/emjpm-ui-core/dist/Type";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import * as XLSX from "xlsx";
import checkExcelDatas from "./checkExcelDatas";
import { ServiceMesureImportResultStyle } from "./style";
import { IMPORT_MESURES } from "./mutations";

const FilePicker = props => {
  return (
    <Box mb="2">
      <Input
        id="file"
        type="file"
        name="file"
        onChange={event => {
          props.handleFileChosen(event.currentTarget.files[0]);
        }}
        placeholder="Sélectionner votre fichier excel"
      />
    </Box>
  );
};

const RestartButton = ({ restart }) => (
  <Button variant="outline" onClick={() => restart()}>
    Sélectionner un autre fichier
  </Button>
);

const ResultMessage = ({ success, restart }) => (
  <Flex flexDirection="row" alignItems="center" p={7} sx={ServiceMesureImportResultStyle(success)}>
    <Text ml={2} fontSize={6}>
      {success
        ? "Votre fichier a été importé correctement"
        : "Votre fichier comporte des données non compatibles."}
    </Text>
    <RestartButton restart={restart} />
  </Flex>
);

export const ServiceAddMesureImport = () => {
  const [result, setResult] = useState(false);
  const [importMesures] = useMutation(IMPORT_MESURES);

  const handleFileChosen = file => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      const data = new Uint8Array(reader.result);
      const wb = XLSX.read(data, { type: "array" });
      const sheet_name_list = wb.SheetNames;
      const datas = XLSX.utils.sheet_to_json(wb.Sheets[sheet_name_list[0]], { raw: false });
      const errors = checkExcelDatas(datas);

      if (errors.length == 0) {
        importMesures({
          variables: {
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            content: datas
          }
        });
      }
      setResult({
        errors
      });
    };
  };

  return (
    <>
      {!result && <FilePicker handleFileChosen={handleFileChosen} />}
      {result && (
        <ResultMessage restart={() => setResult(false)} success={result.errors.length == 0} />
      )}
    </>
  );
};
