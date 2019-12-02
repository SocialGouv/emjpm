import { Input } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

const MandataireMesureImportFilePicker = props => {
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

export default MandataireMesureImportFilePicker;
