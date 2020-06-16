import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { MandataireMesureDeleteForm } from "./MandataireMesureDeleteForm";
import { ServiceMesureDeleteStyle } from "./style";

const MandataireMesureDelete = (props) => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureDeleteStyle} {...props}>
      <MandataireMesureDeleteForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { MandataireMesureDelete };
