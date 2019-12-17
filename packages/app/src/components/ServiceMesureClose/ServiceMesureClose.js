import React from "react";
import { Box } from "rebass";

import { ServiceCloseMesure } from "../ServiceMesures";
import { ServiceMesureCloseStyle } from "./style";

const ServiceMesureClose = props => {
  const { mesureId } = props;

  return (
    <Box sx={ServiceMesureCloseStyle} {...props}>
      <ServiceCloseMesure mt="3" currentMesure={mesureId} isPage />
    </Box>
  );
};

export { ServiceMesureClose };
