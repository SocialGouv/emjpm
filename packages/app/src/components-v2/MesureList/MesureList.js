import React from "react";
import { Box } from "rebass";

import { MesureListStyle } from "./style";

const MesureList = props => {
  return (
    <Box sx={MesureListStyle} {...props}>
      MesureList
    </Box>
  );
};

export { MesureList };
