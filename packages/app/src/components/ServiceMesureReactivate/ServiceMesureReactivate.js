import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceMesureReactivateForm } from "./ServiceMesureReactivateForm";
import { ServiceMesureReactivateStyle } from "./style";

const ServiceMesureReactivate = props => {
  const { mesureId } = props;
  const { mesure: serviceId } = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureReactivateStyle} {...props}>
      <ServiceMesureReactivateForm mt="3" serviceId={serviceId} mesureId={mesureId} isPage />
    </Box>
  );
};

export { ServiceMesureReactivate };
