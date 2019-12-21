import React from "react";
import { Box } from "rebass";

import { ServiceDeleteMesureForm } from "./ServiceMesureDeleteForm";
import { ServiceMesureDeleteStyle } from "./style";

const RESULT_PER_PAGE = 20;

const ServiceMesureDelete = props => {
  const { mesureId } = props;

  // basic query for mesures page
  const queryVariables = {
    antenne: null,
    limit: RESULT_PER_PAGE,
    offset: 0,
    searchText: null,
    status: null,
    type: null
  };

  return (
    <Box sx={ServiceMesureDeleteStyle} {...props}>
      <ServiceDeleteMesureForm mt="3" queryVariables={queryVariables} mesureId={mesureId} />
    </Box>
  );
};

export { ServiceMesureDelete };
