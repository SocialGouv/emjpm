import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { formatServiceTribunalList } from "../../util/services";
import { MesureContext } from "../MesureContext";
import { DEPARTEMENTS, SERVICE_TRIBUNAL } from "../ServiceMesures/queries";
import { UserContext } from "../UserContext";
import { ServiceMesureEditForm } from "./ServiceMesureEditForm";
import { ServiceMesureEditStyle } from "./style";

const ServiceMesureEdit = props => {
  const { mesureId } = props;
  const mesure = useContext(MesureContext);
  const { user_antennes } = useContext(UserContext);
  const {
    service: { service_id }
  } = mesure;

  const { loading, error, data } = useQuery(SERVICE_TRIBUNAL, {
    variables: { serviceId: service_id }
  });

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

  const tribunalList = formatServiceTribunalList(data.service_tis);

  return (
    <Box sx={ServiceMesureEditStyle} {...props}>
      <ServiceMesureEditForm
        mt="3"
        tribunalList={tribunalList}
        departementsData={departementsData}
        mesureId={mesureId}
        user_antennes={user_antennes}
        mesure={mesure}
      />
    </Box>
  );
};

export { ServiceMesureEdit };
