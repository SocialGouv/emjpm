import React from "react";
import { Box } from "rebass";

import { MandataireMesureCloseForm } from "./MandataireMesureCloseForm";
import { ServiceMesureCloseStyle } from "./style";

const MandataireMesureClose = props => {
  const { mesureId } = props;

  return (
    <Box sx={ServiceMesureCloseStyle} {...props}>
      <MandataireMesureCloseForm mt="3" mesureId={mesureId} />
    </Box>
  );
};

export { MandataireMesureClose };
