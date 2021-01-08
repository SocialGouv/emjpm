import { Box } from "rebass";

import { FilePicker } from "~/ui";

const inputStyle = {
  display: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};

const SingleImportFilePicker = ({ onFileChosen, placeholder }) => {
  return (
    <Box mb="2">
      <FilePicker
        sx={inputStyle}
        id="file"
        type="file"
        name="file"
        value=""
        onChange={(event) => {
          const file = event.currentTarget.files[0];
          onFileChosen(file);
        }}
        placeholder={placeholder}
      />
    </Box>
  );
};

export { SingleImportFilePicker };
