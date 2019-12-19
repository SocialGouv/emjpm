import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { MandataireMesureEditForm } from "./MandataireMesureEditForm";
import { ServiceMesureEditStyle } from "./style";

const MandataireMesureEdit = props => {
  const { mesureId } = props;
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <MandataireMesureEditForm mt="3" currentMesure={mesureId} isPage {...mesure} />
    </Box>
  );
};

export { MandataireMesureEdit };
