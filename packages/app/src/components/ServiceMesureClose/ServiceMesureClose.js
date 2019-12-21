import React from "react";
import { Box } from "rebass";

import { ServiceMesureCloseForm } from "./ServiceMesureCloseForm";
import { ServiceMesureCloseStyle } from "./style";

const ServiceMesureClose = props => {
  const { mesureId } = props;

  return (
    <Box sx={ServiceMesureCloseStyle} {...props}>
      <ServiceMesureCloseForm mt="3" mesureId={mesureId} />
    </Box>
  );
};

export { ServiceMesureClose };
