import React, { useContext } from "react";
import { Box } from "rebass";

import { UserContext } from "../UserContext";
import { MandataireMesureAcceptForm } from "./MandataireMesureAcceptForm";
import { ServiceMesureAcceptStyle } from "./style";

const MandataireMesureAccept = props => {
  const { mesureId } = props;
  const { user_antennes } = useContext(UserContext);

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <MandataireMesureAcceptForm
        mt="3"
        user_antennes={user_antennes}
        currentMesure={mesureId}
        isPage
      />
    </Box>
  );
};

export { MandataireMesureAccept };
