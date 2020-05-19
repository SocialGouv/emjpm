import { Input } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

const SingleImportFilePicker = ({ onFileChosen, placeholder }) => {
  return (
    <Box mb="2">
      <Input
        id="file"
        type="file"
        name="file"
        value=""
        onChange={event => {
          console.log("xxx event:", event.currentTarget.files);
          const file = event.currentTarget.files[0];
          onFileChosen(file);
        }}
        placeholder={placeholder}
      />
    </Box>
  );
};

export { SingleImportFilePicker };
