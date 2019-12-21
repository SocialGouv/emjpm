import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceMesureReactivateForm } from "./ServiceMesureReactivateForm";
import { ServiceMesureReactivateStyle } from "./style";

const ServiceMesureReactivate = props => {
  const { mesureId } = props;
  const {
    service: { service_id }
  } = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureReactivateStyle} {...props}>
      <ServiceMesureReactivateForm mt="3" serviceId={service_id} mesureId={mesureId} isPage />
    </Box>
  );
};

export { ServiceMesureReactivate };
