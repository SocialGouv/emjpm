import { useMutation } from "@apollo/react-hooks";
import { Button, Card, Heading2, Input } from "@socialgouv/emjpm-ui-core";
import { Text } from "@socialgouv/emjpm-ui-core/dist/Type";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import * as XLSX from "xlsx";

import checkDatas from "./checkDatas";
import { ADD_IMPORT } from "./mutations";
import { ServiceMesureImportResultStyle } from "./style";

const grayCard = {
  bg: "cardSecondary",
  borderRadius: "5px 0 0 5px",
  m: "2",
  p: "5"
};

const FilePicker = props => {
  return (
    <Box mb="2">
      <Input
        id="file"
        type="file"
        name="file"
        value=""
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

const ResultMessage = ({ result, restart }) => {
  const errors = result.errors;
  const mesures = result.mesures;
  return (
    <>
      <Flex alignItems="center" p={7} sx={ServiceMesureImportResultStyle}>
        <Flex flexDirection="column">
          <Heading2>{`Résultat de l'import`}</Heading2>
          <Text
            m={2}
            fontSize={2}
          >{`${mesures.length} mesures vont être importées ou mises à jour. Vous allez recevoir un email dans quelques instants.`}</Text>
          <Text
            m={2}
            fontSize={2}
          >{`${errors.length} mesures ne seront pas importées ou mises à jour. Les erreurs sont indiquées ci-dessous.`}</Text>
        </Flex>
        <RestartButton restart={restart} />
      </Flex>
      {errors && (
        <Card sx={grayCard} overflow="hidden">
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Card>
      )}
    </>
  );
};

const findSeparator = line => {
  const tabulation = "\t";
  const semilicon = ";";

  let separatorChar = tabulation;
  if (line.split(semilicon).length > 1) {
    separatorChar = semilicon;
  }
  return separatorChar;
};

function csvToArray(csv) {
  var lines = csv.split("\n");
  const separatorChar = findSeparator(lines[0]);

  var result = [];
  const headerCells = lines[0].split(separatorChar);
  var headers = headerCells.map(header => header.trim());

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(separatorChar);

    for (var j = 0; j < headers.length; j++) {
      const val = currentline[j];
      obj[headers[j]] = val ? val.trim() : undefined;
    }

    result.push(obj);
  }

  return result;
}

export const MandataireAddMesureImport = () => {
  const [result, setResult] = useState(false);
  const [AddImport] = useMutation(ADD_IMPORT);

  const handleFileChosen = file => {
    const reader = new FileReader();

    const filename = file.name;
    const isExcel = filename.endsWith(".xls") || filename.endsWith(".xlsx");
    reader.onload = function() {
      let mesureDatas;
      if (isExcel) {
        const binaryString = reader.result;
        const wb = XLSX.read(binaryString, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        mesureDatas = XLSX.utils.sheet_to_json(ws, { dateNF: "dd/mm/yyyy" });
      } else {
        const fileContentAsText = reader.result;
        mesureDatas = csvToArray(fileContentAsText);
      }

      const trimProperties = data =>
        Object.keys(data).map(
          k => (data[k] = typeof data[k] == "string" ? data[k].trim() : data[k])
        );

      mesureDatas.forEach(data => trimProperties(data));
      const { errors, mesures } = checkDatas(mesureDatas);

      if (mesures.length > 0) {
        AddImport({
          variables: {
            content: mesures,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type
          }
        });
      }
      setResult({
        errors,
        mesures
      });
    };
    if (isExcel) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <>
      {!result && <FilePicker handleFileChosen={handleFileChosen} />}
      {result && <ResultMessage restart={() => setResult(false)} result={result} />}
    </>
  );
};
