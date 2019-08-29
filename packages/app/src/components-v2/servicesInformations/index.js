import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SERVICES_ANTENNE } from "./queries";
import { Informations } from "../informations";

const ServicesInformations = () => {
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

  return (
    <div>
      <Informations loading={loading} error={loading} service_antenne={service_antenne} />
    </div>
  );
};

export { ServicesInformations };
