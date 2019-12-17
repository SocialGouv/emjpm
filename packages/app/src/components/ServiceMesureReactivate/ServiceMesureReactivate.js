import React from "react";
import { Box } from "rebass";

import { ServiceReactivateMesure } from "../ServiceMesures";
import { ServiceMesureReactivateStyle } from "./style";

const ServiceMesureReactivate = props => {
  const { mesureId } = props;

  return (
    <Box sx={ServiceMesureReactivateStyle} {...props}>
      <ServiceReactivateMesure mt="3" currentMesure={mesureId} isPage />
    </Box>
  );
};

export { ServiceMesureReactivate };
