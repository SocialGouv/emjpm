import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { MandataireMesureAcceptForm } from "./MandataireMesureAcceptForm";
import { DEPARTEMENTS } from "./queries";
import { ServiceMesureAcceptStyle } from "./style";

const MandataireMesureAccept = props => {
  const mesure = useContext(MesureContext);
  const { data: departementsData } = useQuery(DEPARTEMENTS);

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <MandataireMesureAcceptForm mt="3" departementsData={departementsData} mesure={mesure} />
    </Box>
  );
};

export { MandataireMesureAccept };
