import React from "react";
import { Box } from "rebass";

import { EnquetePopulationsForm } from "./EnquetePopulationsForm";

export const EnquetePopulationsCuratelle = props => {
  const { goToPrevPage, goToNextPage } = props;
  return (
    <Box>
      <EnquetePopulationsForm
        handleSubmit={async () => {
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title={"Curatelle"}
      />
    </Box>
  );
};

export default EnquetePopulationsCuratelle;
