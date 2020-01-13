import React from "react";
import { Box } from "rebass";

import { MagistratMesureAddForm } from "./MagistratMesureAddForm";
import { MagistratMandataireStyle } from "./style";

const MagistratMesureAdd = props => {
  const { serviceId, mandataireId } = props;
  return (
    <Box sx={MagistratMandataireStyle} {...props}>
      <MagistratMesureAddForm mandataireId={mandataireId} serviceId={serviceId} />
    </Box>
  );
};

export { MagistratMesureAdd };
