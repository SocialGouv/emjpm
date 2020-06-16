import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceDeleteMesureForm } from "./ServiceMesureDeleteForm";
import { ServiceMesureDeleteStyle } from "./style";

const ServiceMesureDelete = (props) => {
  const mesure = useContext(MesureContext);

  return (
    <Box sx={ServiceMesureDeleteStyle} {...props}>
      <ServiceDeleteMesureForm mt="3" mesure={mesure} />
    </Box>
  );
};

export { ServiceMesureDelete };
