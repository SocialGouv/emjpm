import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Box } from "rebass";

import { UserContext } from "../UserContext";
import { DEPARTEMENTS } from "./queries";
import { ServiceMesureAcceptForm } from "./ServiceMesureAcceptForm";
import { ServiceMesureAcceptStyle } from "./style";

const ServiceMesureAccept = props => {
  const { mesureId } = props;
  const { service_members } = useContext(UserContext);
  const [
    {
      service: { service_antennes }
    }
  ] = service_members;

  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  if (departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (departementsError) {
    return <div>Erreur...</div>;
  }

  return (
    <Box sx={ServiceMesureAcceptStyle} {...props}>
      <ServiceMesureAcceptForm
        mt="3"
        departementsData={departementsData}
        service_antennes={service_antennes}
        mesureId={mesureId}
      />
    </Box>
  );
};

export { ServiceMesureAccept };
