import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { ServiceEditMesure } from "../ServiceMesures/ServiceEditMesure";
import { UserContext } from "../UserContext";
import { ServiceMesureEditStyle } from "./style";
const ServiceMesureEdit = props => {
  const { mesureId } = props;
  const mesure = useContext(MesureContext);
  const { user_antennes } = useContext(UserContext);

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <ServiceEditMesure
        mt="3"
        currentMesure={mesureId}
        isPage
        user_antennes={user_antennes}
        {...mesure}
      />
    </Box>
  );
};

export { ServiceMesureEdit };
