import { useQuery } from "@apollo/react-hooks";
import React from "react";

import { MesureImportService } from "./MesureImportService";
import { SERVICE_ANTENNES } from "./queries";

const MesureImportServiceWrapper = props => {
  const { serviceId } = props;
  const { data, loading, error } = useQuery(SERVICE_ANTENNES, {
    variables: { service_id: serviceId }
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const { antennes } = data;

  return <MesureImportService serviceId={serviceId} serviceAntennes={antennes} />;
};

export { MesureImportServiceWrapper };
