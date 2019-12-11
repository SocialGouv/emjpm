import { useMutation } from "@apollo/react-hooks";
import React from "react";

import { AdminServiceForm } from "./AdminServiceForm";
import { UPDATE_SERVICE } from "./mutations";

export const AdminEditService = ({ service, closePanel }) => {
  const [UpdateService] = useMutation(UPDATE_SERVICE, {
    onCompleted: closePanel
  });

  return (
    <AdminServiceForm
      service={service}
      onCancel={closePanel}
      onSubmit={values =>
        UpdateService({
          refetchQueries: ["services", "services_aggregate"],
          variables: {
            code_postal: values.code_postal,
            department_id: values.departement.value,
            email: values.email,
            etablissement: values.etablissement,
            id: service.id,
            telephone: values.telephone,
            ville: values.ville
          }
        })
      }
    />
  );
};
