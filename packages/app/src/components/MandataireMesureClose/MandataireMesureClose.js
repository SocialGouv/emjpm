import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { MandataireMesureCloseForm } from "./MandataireMesureCloseForm";
import { ServiceMesureCloseStyle } from "./style";

const MandataireMesureClose = (props) => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureCloseStyle} {...props}>
      <MandataireMesureCloseForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { MandataireMesureClose };
