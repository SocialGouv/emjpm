import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceMesureCloseForm } from "./ServiceMesureCloseForm";
import { ServiceMesureCloseStyle } from "./style";

const ServiceMesureClose = props => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureCloseStyle} {...props}>
      <ServiceMesureCloseForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { ServiceMesureClose };
