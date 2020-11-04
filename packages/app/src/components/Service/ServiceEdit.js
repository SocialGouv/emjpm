import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { useDepartements } from "../../util/departements/useDepartements.hook";
import { captureException } from "../../util/sentry";
import { UPDATE_SERVICE } from "./mutations";
import { SERVICE } from "./queries";
import { ServiceForm } from "./ServiceForm";

export const ServiceEdit = (props) => {
  const { serviceId, onSuccess } = props;
  const serviceQuery = useQuery(SERVICE, {
    fetchPolicy: "network-only",
    variables: { serviceId },
  });
  const { departements } = useDepartements();
  const [updateService] = useMutation(UPDATE_SERVICE);

  if (serviceQuery.loading) {
    return <div>loading...</div>;
  }

  if (serviceQuery.error) {
    return <div>error</div>;
  }

  const {
    services: [service],
  } = serviceQuery.data;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateService({
        refetchQueries: ["services", "services_aggregate"],
        variables: {
          adresse: values.adresse,
          code_postal: values.code_postal,
          department_id: departements.find(
            (dep) => dep.code === values.departement
          ).id,
          email: values.email,
          etablissement: values.etablissement,
          id: service.id,
          siret: values.siret,
          telephone: values.telephone,
          ville: values.ville,
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
