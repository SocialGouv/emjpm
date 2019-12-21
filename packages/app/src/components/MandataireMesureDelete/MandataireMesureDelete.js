import React from "react";
import { Box } from "rebass";

import { MandataireMesureDeleteForm } from "./MandataireMesureDeleteForm";
import { ServiceMesureDeleteStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MandataireMesureDelete = props => {
  const { mesureId } = props;

  // basic query for mesures page
  const queryVariables = {
    limit: RESULT_PER_PAGE,
    offset: 0,
    searchText: null,
    status: null,
    type: null
  };

  return (
    <Box sx={ServiceMesureDeleteStyle} {...props}>
      <MandataireMesureDeleteForm mt="3" queryVariables={queryVariables} mesureId={mesureId} />
    </Box>
  );
};

export { MandataireMesureDelete };
