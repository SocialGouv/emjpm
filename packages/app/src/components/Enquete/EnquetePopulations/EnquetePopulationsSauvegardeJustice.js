import React from "react";
import { Box } from "rebass";

import { EnquetePopulationsForm } from "./EnquetePopulationsForm";

export const EnquetePopulationsTutelle = props => {
  const { goToPrevPage, goToNextPage } = props;
  return (
    <Box>
      <EnquetePopulationsForm
        handleSubmit={async () => {
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title={"Sauvegarde de justice"}
      />
    </Box>
  );
};

export default EnquetePopulationsTutelle;
