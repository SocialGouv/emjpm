import React from "react";
import { Box } from "rebass";

import { MagistratMandataireForm } from "./MagistratMandataireForm";
import { MagistratMandataireStyle } from "./style";

// TODO rename to MagistratMesureCreate
const MagistratMandataire = props => {
  const { serviceId, mandataireId } = props;
  return (
    <Box sx={MagistratMandataireStyle} {...props}>
      <MagistratMandataireForm mandataireId={mandataireId} serviceId={serviceId} />
    </Box>
  );
};

export { MagistratMandataire };
