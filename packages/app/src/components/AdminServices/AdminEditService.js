import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { AdminServiceForm } from "./AdminServiceForm";
import { UPDATE_SERVICE } from "./mutations";
import { DEPARTEMENTS, SERVICE } from "./queries";

export const AdminEditService = props => {
  const { serviceId } = props;
  const serviceQuery = useQuery(SERVICE, { variables: { serviceId } });
  const departmentsQuery = useQuery(DEPARTEMENTS);
  const [updateService] = useMutation(UPDATE_SERVICE);

  if (serviceQuery.loading || departmentsQuery.loading) {
    return <div>loading...</div>;
  }

  if (serviceQuery.error || departmentsQuery.error) {
    return <div>error</div>;
  }

  const {
    services: [service]
  } = serviceQuery.data;
  const { departements } = departmentsQuery.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    const { city, depcode, label, lat, lng, postcode } = values.geocode;
    const department = departements.find(d => d.id === depcode);

    try {
      await updateService({
        refetchQueries: ["services", "services_aggregate"],
        variables: {
          id: service.id,
          adresse: label,
          code_postal: postcode,
          department_id: department.id,
          email: values.email,
          etablissement: values.etablissement,
          telephone: values.telephone,
          ville: city,
          latitude: lat,
          longitude: lng
        }
      });
    } catch (error) {
      // TODO(paullaunay): log error in sentry and form
    }

    setSubmitting(false);
  };

  return <AdminServiceForm handleSubmit={handleSubmit} service={service} />;
};
