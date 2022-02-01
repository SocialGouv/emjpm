import { Box } from "rebass";

import { FilePicker } from "~/components";

const inputStyle = {
  display: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};

function SingleImportFilePicker({ onFileChosen, placeholder }) {
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
        aria-label="Sélectionner votre fichier excel"
      />
    </Box>
  );
}

export { SingleImportFilePicker };
