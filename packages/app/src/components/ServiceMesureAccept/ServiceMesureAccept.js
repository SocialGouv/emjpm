import React, { useContext } from "react";
import { Box } from "rebass";

import { ServiceAcceptMesure } from "../ServiceMesures";
import { UserContext } from "../UserContext";
import { ServiceMesureAcceptStyle } from "./style";

const ServiceMesureAccept = props => {
  const { mesureId } = props;
  const { user_antennes } = useContext(UserContext);

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <ServiceAcceptMesure mt="3" user_antennes={user_antennes} currentMesure={mesureId} isPage />
    </Box>
  );
};

export { ServiceMesureAccept };
