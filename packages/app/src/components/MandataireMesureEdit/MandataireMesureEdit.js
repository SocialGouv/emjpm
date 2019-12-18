import React, { useContext } from "react";
import { Box } from "rebass";

import { MesureContext } from "../MesureContext";
import { UserContext } from "../UserContext";
import { MandataireMesureEditForm } from "./MandataireMesureEditForm";
import { ServiceMesureEditStyle } from "./style";

const MandataireMesureEdit = props => {
  const { mesureId } = props;
  const mesure = useContext(MesureContext);
  const { user_antennes } = useContext(UserContext);

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <MandataireMesureEditForm
        mt="3"
        currentMesure={mesureId}
        isPage
        user_antennes={user_antennes}
        {...mesure}
      />
    </Box>
  );
};

export { MandataireMesureEdit };
