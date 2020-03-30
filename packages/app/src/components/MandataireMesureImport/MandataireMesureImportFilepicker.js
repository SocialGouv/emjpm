import { Input } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

const MandataireMesureImportFilepicker = props => {
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

export { MandataireMesureImportFilepicker };
