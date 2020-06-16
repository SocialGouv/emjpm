import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceMesureReactivateForm } from "./ServiceMesureReactivateForm";
import { ServiceMesureReactivateStyle } from "./style";

const ServiceMesureReactivate = (props) => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureReactivateStyle} {...props}>
      <ServiceMesureReactivateForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { ServiceMesureReactivate };
