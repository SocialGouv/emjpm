import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { captureException } from "../../util/sentry";
import { UPDATE_SERVICE } from "./mutations";
import { DEPARTEMENTS, SERVICE } from "./queries";
import { ServiceForm } from "./ServiceForm";

export const ServiceEdit = (props) => {
  const { serviceId, onSuccess } = props;
  const serviceQuery = useQuery(SERVICE, {
    fetchPolicy: "network-only",
    variables: { serviceId },
  });
  const departmentsQuery = useQuery(DEPARTEMENTS);
  const [updateService] = useMutation(UPDATE_SERVICE);

  if (serviceQuery.loading || departmentsQuery.loading) {
    return <div>loading...</div>;
  }

  if (serviceQuery.error || departmentsQuery.error) {
    return <div>error</div>;
  }

  const {
    services: [service],
  } = serviceQuery.data;
  const { departements } = departmentsQuery.data;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const {
      city,
      depcode,
      label,
      longitude,
      latitude,
      postcode,
    } = values.geocode;
    const department = departements.find((d) => d.code === depcode);

    if (!department) {
      setErrors({ geocode: "L'adresse est invalide, veuillez la resaisir" });
      setSubmitting(false);
      return;
    }

    try {
      await updateService({
        refetchQueries: ["services", "services_aggregate"],
        variables: {
          adresse: label,
          code_postal: postcode,
          department_id: department.id,
          email: values.email,
          etablissement: values.etablissement,
          id: service.id,
          latitude: latitude,
          longitude: longitude,
          siret: values.siret,
          telephone: values.telephone,
          ville: city,
        },
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
  };

  return <ServiceForm handleSubmit={handleSubmit} service={service} />;
};

export default ServiceEdit;
