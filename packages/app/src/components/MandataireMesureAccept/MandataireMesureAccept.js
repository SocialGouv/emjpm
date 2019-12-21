import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { UserContext } from "../UserContext";
import { MandataireMesureAcceptForm } from "./MandataireMesureAcceptForm";
import { DEPARTEMENTS } from "./queries";
import { ServiceMesureAcceptStyle } from "./style";

const MandataireMesureAccept = props => {
  const { mesureId } = props;
  const { user_antennes } = useContext(UserContext);
  const { data: departementsData } = useQuery(DEPARTEMENTS);

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <MandataireMesureAcceptForm
        mt="3"
        departementsData={departementsData}
        user_antennes={user_antennes}
        mesureId={mesureId}
      />
    </Box>
  );
};

export { MandataireMesureAccept };
