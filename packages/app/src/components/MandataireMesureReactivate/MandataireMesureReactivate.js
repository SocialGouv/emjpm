import React from "react";
import { Box } from "rebass";

import { MandataireMesureReactivateForm } from "./MandataireMesureReactivateForm";
import { ServiceMesureReactivateStyle } from "./style";

const MandataireMesureReactivate = props => {
  const { mesureId } = props;

  return (
    <Box sx={ServiceMesureReactivateStyle} {...props}>
      <MandataireMesureReactivateForm mt="3" mesureId={mesureId} />
    </Box>
  );
};

export { MandataireMesureReactivate };
