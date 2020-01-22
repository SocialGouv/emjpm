import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { MandataireMesureReactivateForm } from "./MandataireMesureReactivateForm";
import { ServiceMesureReactivateStyle } from "./style";

const MandataireMesureReactivate = () => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureReactivateStyle}>
      <MandataireMesureReactivateForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { MandataireMesureReactivate };
