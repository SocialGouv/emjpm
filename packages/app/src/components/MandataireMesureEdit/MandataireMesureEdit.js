import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { formatUserTribunalList } from "../../util/mandataires";
import { MesureContext } from "../MesureContext";
import { MandataireMesureEditForm } from "./MandataireMesureEditForm";
import { DEPARTEMENTS, USER_TRIBUNAL } from "./queries";
import { ServiceMesureEditStyle } from "./style";

const MandataireMesureEdit = props => {
  const mesure = useContext(MesureContext);

  const { loading, error, data } = useQuery(USER_TRIBUNAL);
  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const tribunalList = formatUserTribunalList(data.user_tis);

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <MandataireMesureEditForm
        mt="3"
        departementsData={departementsData}
        tribunalList={tribunalList}
        mesure={mesure}
      />
    </Box>
  );
};

export { MandataireMesureEdit };
