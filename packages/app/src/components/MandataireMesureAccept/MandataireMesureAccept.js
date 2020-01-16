import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { MandataireMesureAcceptForm } from "./MandataireMesureAcceptForm";
import { DEPARTEMENTS } from "./queries";
import { ServiceMesureAcceptStyle } from "./style";

const MandataireMesureAccept = props => {
  const { mesureId } = props;
  const { data: departementsData } = useQuery(DEPARTEMENTS);

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <MandataireMesureAcceptForm mt="3" departementsData={departementsData} mesureId={mesureId} />
    </Box>
  );
};

export { MandataireMesureAccept };
