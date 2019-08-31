import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Informations } from "../Informations";
import { GET_SERVICES_ANTENNE } from "./queries";

const ServicesInformations = props => {
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    variables: {
      serviceId: 1
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { service_antenne } = data;

  return <Informations {...props} service_antenne={service_antenne} />;
};

export { ServicesInformations };
